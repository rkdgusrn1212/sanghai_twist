import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
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
    className="category-tree-child-list d-flex align-items-center"
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
    {hasNodes && <ToggleIcon on={isOpen} />}
    <p className="me-2 align-self-baseline">
      <small>{path && path + '>'}</small>
    </p>
    <b>{name}</b>
  </ListGroup.Item>
);

export const defaultChildren = ({ search, items }) => {
  const onSearch = (e) => {
    const { value } = e.target;
    search && search(value);
  };
  return (
    <>
      {search && (
        <Form.Control
          className="category-tree-search"
          type="search"
          placeholder="카테고리 검색어 입력"
          onChange={onSearch}
        />
      )}
      <ListGroup className="category-tree-root">
        {items.map(({ code, ...props }) => (
          <ItemComponent key={code} {...props}></ItemComponent>
        ))}
      </ListGroup>
    </>
  );
};
