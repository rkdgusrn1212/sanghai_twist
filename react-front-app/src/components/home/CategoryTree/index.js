import React from 'react';
import debounce from 'tiny-debounce';

import { fastWalk, slowWalk } from './walk';
import { defaultChildren } from './renderProps';
import KeyDown from './KeyDown';

const defaultOnClick = (props) => console.log(props); // eslint-disable-line no-console

class CategoryTree extends React.Component {
  static defaultProps = {
    data: {},
    onClickItem: defaultOnClick,
    debounceTime: 125,
    children: defaultChildren,
    hasSearch: true,
    cacheSearch: true,
    resetOpenNodesOnDataUpdate: false,
    disableKeyboard: false,
  };

  state = {
    openNodes: this.props.initialOpenNodes || [],
    searchTerm: '',
    activeKey: this.props.initialActiveKey || '',
    focusKey: this.props.initialFocusKey || '',
  };

  componentDidUpdate(prevProps) {
    const { data, initialOpenNodes, resetOpenNodesOnDataUpdate } = this.props;
    if (
      prevProps.data !== data &&
      resetOpenNodesOnDataUpdate &&
      initialOpenNodes
    ) {
      this.setState({ openNodes: initialOpenNodes });
    }
  }

  resetOpenNodes = (newOpenNodes, activeKey, focusKey) => {
    const { initialOpenNodes } = this.props;
    const openNodes =
      (Array.isArray(newOpenNodes) && newOpenNodes) || initialOpenNodes || [];
    this.setState({
      openNodes,
      searchTerm: '',
      activeKey: activeKey || '',
      focusKey: focusKey || activeKey || '',
    });
  };

  search = (value) => {
    const { debounceTime } = this.props;
    const search = debounce(
      (searchTerm) => this.setState({ searchTerm }),
      debounceTime,
    );
    search(value);
  };

  toggleNode = (node) => {
    if (!this.props.openNodes) {
      const { openNodes } = this.state;
      const newOpenNodes = openNodes.includes(node)
        ? openNodes.filter((openNode) => openNode !== node)
        : [...openNodes, node];
      this.setState({ openNodes: newOpenNodes });
    }
  };

  generalizeData(data) {
    return {
      top: {
        name: '상의',
        code: 'top',
        child: data.top,
      },
      pants: {
        name: '바지',
        code: 'pants',
        child: data.pants,
      },
    };
  }

  generateItems = () => {
    const { data, onClickItem, locale, matchSearch } = this.props;
    const { searchTerm } = this.state;
    const openNodes = this.props.openNodes || this.state.openNodes;
    const activeKey = this.props.activeKey || this.state.activeKey;
    const focusKey = this.props.focusKey || this.state.focusKey;
    const defaultSearch = this.props.cacheSearch ? fastWalk : slowWalk;
    const items = data
      ? defaultSearch({
          data: this.generalizeData(data),
          openNodes,
          searchTerm,
          locale,
          matchSearch,
        })
      : [];

    return items.map((item) => {
      const focused = item.code === focusKey;
      const active = item.code === activeKey;
      const onClick = () => {
        const newActiveKey = this.props.activeKey || item.code;
        this.setState({ activeKey: newActiveKey, focusKey: newActiveKey });
        onClickItem && onClickItem(item);
      };

      const toggleNode = item.hasNodes
        ? () => this.toggleNode(item.code)
        : undefined;
      return { ...item, focused, active, onClick, toggleNode };
    });
  };

  getKeyDownProps = (items) => {
    const { onClickItem } = this.props;
    const { focusKey, activeKey } = this.state;

    const focusIndex = items.findIndex(
      (item) => item.code === (focusKey || activeKey),
    );
    const getFocusKey = (item) => {
      const keyArray = item.code.split('/');

      return keyArray.length > 1
        ? keyArray.slice(0, keyArray.length - 1).join('/')
        : item.code;
    };

    return {
      up: () => {
        this.setState(({ focusKey }) => ({
          focusKey: focusIndex > 0 ? items[focusIndex - 1].code : focusKey,
        }));
      },
      down: () => {
        this.setState(({ focusKey }) => ({
          focusKey:
            focusIndex < items.length - 1
              ? items[focusIndex + 1].code
              : focusKey,
        }));
      },
      left: () => {
        const item = items[focusIndex];
        if (item) {
          this.setState(({ openNodes, ...rest }) => {
            const newOpenNodes = openNodes.filter((node) => node !== item.code);
            return item.isOpen
              ? { ...rest, openNodes: newOpenNodes, focusKey: item.code }
              : { ...rest, focusKey: getFocusKey(item) };
          });
        }
      },
      right: () => {
        const { hasNodes, code } = items[focusIndex];
        if (hasNodes)
          this.setState(({ openNodes }) => ({
            openNodes: [...openNodes, code],
          }));
      },
      enter: () => {
        this.setState(({ focusKey }) => ({ activeKey: focusKey }));
        onClickItem && onClickItem(items[focusIndex]);
      },
    };
  };

  render() {
    const { children, hasSearch, disableKeyboard } = this.props;
    const { searchTerm } = this.state;

    const search = this.search;
    const items = this.generateItems();
    const resetOpenNodes = this.resetOpenNodes;
    const render = children || defaultChildren;

    const renderProps = hasSearch
      ? {
          search,
          resetOpenNodes,
          items,
          searchTerm,
        }
      : { items, resetOpenNodes };

    return disableKeyboard ? (
      render(renderProps)
    ) : (
      <KeyDown {...this.getKeyDownProps(items)}>{render(renderProps)}</KeyDown>
    );
  }
}

export default CategoryTree;
