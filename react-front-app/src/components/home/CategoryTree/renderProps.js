import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import expandIcon from './expand.png';
import './toggle.scss';
import './tree.scss';

const DEFAULT_PADDING = 0.75;
const ICON_SIZE = 2;
const LEVEL_SPACE = 0.3;
const MAX_LEVEL = 10; //레벨 10이상으로 안간다는 가정하에 만듬

const ToggleIcon = ({ on }) => (
  <img
    alt=""
    src={expandIcon}
    className={['category-tree-toggle', on && 'category-tree-toggle-on'].join(
      ' ',
    )}
  />
);

export const ItemComponent = ({
  hasNodes = false,
  isOpen = false,
  level = 0,
  onClick,
  toggleNode,
  active,
  focused,
  name = 'unknown',
  path,
  style = {},
}) => (
  <ListGroup.Item
    className="category-tree-child-list"
    style={{
      paddingLeft: `${
        DEFAULT_PADDING + ICON_SIZE * (hasNodes ? 0 : 1) + level * LEVEL_SPACE
      }rem`,
      zIndex: MAX_LEVEL - level,
      ...style,
    }}
    role="button"
    aria-pressed={active}
    onClick={(e) => {
      hasNodes && toggleNode && toggleNode();
      e.stopPropagation();
    }}
  >
    <div className="d-flex me-1">
      {hasNodes && <ToggleIcon on={isOpen} />}
      <p className="me-2"><small>{path&&path+'>'}</small></p>
      <b>{name}</b>
    </div>
  </ListGroup.Item>
);

export const defaultChildren = ({ search, items, parentName }) => {
  const onSearch = (e) => {
    const { value } = e.target;
    search && search(value);
  };
  return (
    <>
      {search && (
        <input
          aria-label="Type and search"
          type="search"
          placeholder="Type and search"
          onChange={onSearch}
        />
      )}
      <ListGroup>
        {items.map(({ code, ...props }) => (
          <ItemComponent key={code} {...props}></ItemComponent>
        ))}
      </ListGroup>
    </>
  );
};
