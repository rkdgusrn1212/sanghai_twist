import isEmpty from 'is-empty';
import memoize from 'fast-memoize';


const validateData = (data)=> !!data && !isEmpty(data);
const getValidatedData = (data) =>
  validateData(data) ? data : [];

const walk = ({ data, ...props })=> {
  const validatedData = getValidatedData(data);

  const propsWithDefaultValues = { parent: '', level: 0, ...props };
  const handleArray = (dataAsArray) =>
    dataAsArray.reduce((all, node, index) => {
      const branchProps = { node, index, nodeName: node.code, ...propsWithDefaultValues };
      const branch = generateBranch(branchProps);
      return [...all, ...branch];
    }, []);

  const handleObject = (dataAsObject) =>
    Object.entries(dataAsObject)
      .sort((a, b) => a[1].index - b[1].index) // sorted by index
      .reduce((all, [nodeName, node]) => {
        const branchProps = { node, nodeName, ...propsWithDefaultValues };
        const branch = generateBranch(branchProps);
        return [...all, ...branch];
      }, []);

  return Array.isArray(validatedData)
    ? handleArray(validatedData)
    : handleObject(validatedData);
};

const defaultMatchSearch = ({ name, searchTerm }) => {
  const processString = (text) => text.trim().toLowerCase();
  return processString(name).includes(processString(searchTerm));
};

const defaultLocale = ({ name }) => name;

const generateBranch = ({
  node,
  nodeName,
  matchSearch = defaultMatchSearch,
  locale = defaultLocale,
  ...props
}) => {
  const { parent, level, openNodes, searchTerm } = props;

  const { child, name: rawLabel = 'unknown', ...nodeProps } = node;
  const code = [parent.code, nodeName].filter(x => x).join('/');
  const path = [parent.name, node.name].filter(x=>x).join('>');
  const hasNodes = validateData(child);
  const isOpen = hasNodes && (openNodes.includes(code) || !!searchTerm);

  const name = locale({ name: rawLabel, ...nodeProps });
  const isVisible = !searchTerm || matchSearch({ name, searchTerm, ...nodeProps });
  const currentItem = { ...props, ...nodeProps, name, hasNodes, isOpen, code };

  const data = getValidatedData(child);
  const nextLevelItems = isOpen
    ? walk({ data, locale, matchSearch, ...props, parent: {code, name}, level: level + 1, path })
    : [];

  return isVisible ? [currentItem, ...nextLevelItems] : nextLevelItems;
};

export const fastWalk = memoize(walk);
export const slowWalk = walk;
