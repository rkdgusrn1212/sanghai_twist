import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'tiny-debounce';

import { fastWalk, slowWalk } from './walk';
import { DefaultChildren } from './renderProps';
import KeyDown from './KeyDown';

import { useGetCategoryList } from '../../../hooks';

const DEBOUNCE_TIME = 125;

const CategoryTree = ({
  initialOpenNodes,
  resetOpenNodesOnDataUpdate,
  openNodes,
  activeKey,
  focusKey,
  cacheSearch,
  locale,
  matchSearch,
  initialActiveKey,
  initialFocusKey,
  hasSearch,
  disableKeyboard,
  initialSearchTerm,
}) => {
  const [treeState, setTreeState] = useState({
    openNodes: initialOpenNodes || [],
    searchTerm: initialSearchTerm,
    activeKey: initialActiveKey || '',
    focusKey: initialFocusKey || '',
  });

  const { categoryList, isSuccess } = useGetCategoryList();

  useEffect(() => {
    if (resetOpenNodesOnDataUpdate && initialOpenNodes) {
      setTreeState({ ...treeState, openNodes: initialOpenNodes });
    }
  }, [treeState, resetOpenNodesOnDataUpdate, initialOpenNodes]);

  const resetOpenNodes = useCallback(
    (newOpenNodes, activeKey, focusKey) => {
      const openNodes =
        (Array.isArray(newOpenNodes) && newOpenNodes) || initialOpenNodes || [];
      setTreeState({
        openNodes,
        searchTerm: '',
        activeKey: activeKey || '',
        focusKey: focusKey || activeKey || '',
      });
    },
    [initialOpenNodes],
  );

  const search = useCallback((value) => {
    debounce((searchTerm) => {
      setTreeState((prev) => ({ ...prev, searchTerm }));
    }, DEBOUNCE_TIME)(value);
  }, []);

  const toggleNode = useCallback(
    (node) => {
      if (!openNodes) {
        const tempOpenNodes = treeState.openNodes;
        const newOpenNodes = tempOpenNodes.includes(node)
          ? tempOpenNodes.filter((tempOpenNodes) => tempOpenNodes !== node)
          : [...tempOpenNodes, node];
        setTreeState({ ...treeState, openNodes: newOpenNodes });
      }
    },
    [openNodes, treeState],
  );

  const generateItems = useCallback(() => {
    const generalizeData = isSuccess && {
      top: {
        name: '상의',
        code: 'top',
        child: categoryList.top,
      },
      pants: {
        name: '하의',
        code: 'pants',
        child: categoryList.pants,
      },
    };
    const { searchTerm } = treeState;
    const tempActiveKey = activeKey || treeState.activeKey;
    const tempFocusKey = focusKey || treeState.focusKey;
    const defaultSearch = cacheSearch ? fastWalk : slowWalk;
    const items = generalizeData
      ? defaultSearch({
          data: generalizeData,
          openNodes: openNodes || treeState.openNodes,
          searchTerm,
          locale,
          matchSearch,
        })
      : [];

    return items.map((item) => {
      const focused = item.code === tempFocusKey;
      const active = item.code === tempActiveKey;
      const onClick = () => {
        const newActiveKey = tempActiveKey || item.code;
        setTreeState({
          ...treeState,
          activeKey: newActiveKey,
          focusKey: newActiveKey,
        });
        this.navigate(item.url);
      };
      return {
        ...item,
        focused,
        active,
        onClick,
        toggleNode: item.hasNodes ? () => toggleNode(item.code) : undefined,
      };
    });
  }, [
    isSuccess,
    categoryList,
    toggleNode,
    openNodes,
    locale,
    matchSearch,
    treeState,
    activeKey,
    focusKey,
    cacheSearch,
  ]);

  const getKeyDownProps = useCallback(
    (items) => {
      const { focusKey, activeKey } = treeState;

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
          setTreeState(({ focusKey, ...rest }) => ({
            ...rest,
            focusKey: focusIndex > 0 ? items[focusIndex - 1].code : focusKey,
          }));
        },
        down: () => {
          setTreeState(({ focusKey, ...rest }) => ({
            ...rest,
            focusKey:
              focusIndex < items.length - 1
                ? items[focusIndex + 1].code
                : focusKey,
          }));
        },
        left: () => {
          const item = items[focusIndex];
          if (item) {
            setTreeState(({ openNodes, ...rest }) => {
              const newOpenNodes = openNodes.filter(
                (node) => node !== item.code,
              );
              return item.isOpen
                ? { ...rest, openNodes: newOpenNodes, focusKey: item.code }
                : { ...rest, focusKey: getFocusKey(item) };
            });
          }
        },
        right: () => {
          const { hasNodes, code } = items[focusIndex];
          if (hasNodes)
            setTreeState(({ openNodes, ...rest }) => ({
              ...rest,
              openNodes: [...openNodes, code],
            }));
        },
        enter: () => {
          setTreeState(({ focusKey, ...rest }) => ({
            ...rest,
            activeKey: focusKey,
          }));
          this.navigate(items[focusIndex]);
        },
      };
    },
    [treeState],
  );
  const { searchTerm } = treeState;
  const items = generateItems();
  const renderProps = hasSearch
    ? {
        search,
        resetOpenNodes,
        items,
        searchTerm,
      }
    : { items, resetOpenNodes };

  return disableKeyboard ? (
    DefaultChildren(renderProps)
  ) : (
    <KeyDown {...getKeyDownProps(items)}>
      {DefaultChildren(renderProps)}
    </KeyDown>
  );
};

CategoryTree.defaultProps = {
  children: DefaultChildren,
  hasSearch: true,
  cacheSearch: true,
  resetOpenNodesOnDataUpdate: false,
  disableKeyboard: false,
  initialSearchTerm: '',
};

export default CategoryTree;
