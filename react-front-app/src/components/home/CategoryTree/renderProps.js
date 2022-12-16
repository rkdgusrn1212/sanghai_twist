import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
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
  toggleNode,
  active,
  name = 'unknown',
  path,
  code,
  style = {},
}) => {
  const navigate = useNavigate();
  return (
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
        const codeArr = code.split('/');
        hasNodes ||
          navigate(
            process.env.PUBLIC_URL +
              '/list/' +
              codeArr[codeArr.length - 1] +
              '/' +
              (codeArr[0] === 'top') +
              '/I/1',
          );
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
};

export const DefaultChildren = ({ items, searchTerm, handleChange }) => {
  return (
    <>
      <Form.Control
        className="category-tree-search"
        type="search"
        placeholder="카테고리 검색어 입력"
        value={searchTerm}
        onChange={handleChange}
      />
      <ListGroup className="category-tree-root">
        {items.map(({ code, ...props }) => (
          <ItemComponent key={code} code={code} {...props}></ItemComponent>
        ))}
      </ListGroup>
    </>
  );
};
