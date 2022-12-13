import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import expandIcon from './expand.png';
import './toggle.scss';

const DEFAULT_PADDING = 0.75;
const ICON_SIZE = 2;
const LEVEL_SPACE = 1.75;

const ToggleIcon = ({ on}) => (
  <img alt="" src={expandIcon} className={['category-tree-toggle',on&&'category-tree-toggle-on'].join(' ')} width="20" height="20"/>
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
  style = {},
}) => (
  <ListGroup.Item
    style={{
      paddingLeft: `${
        DEFAULT_PADDING + ICON_SIZE * (hasNodes ? 0 : 1) + level * LEVEL_SPACE
      }rem`,
      ...style,
    }}
    role="button"
    aria-pressed={active}
    onClick={(e) => {
      hasNodes && toggleNode && toggleNode();
      e.stopPropagation();
    }}
  >
    {hasNodes && (
      <div className="rstm-toggle-icon">
        <ToggleIcon
          on={isOpen}
        />
      </div>
    )}
    {name}
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
        <input
          className="rstm-search"
          aria-label="Type and search"
          type="search"
          placeholder="Type and search"
          onChange={onSearch}
        />
      )}
      <ListGroup className="rstm-tree-item-group">
        {items.map(({ code, ...props }) => (
          <ItemComponent key={code} {...props}></ItemComponent>
        ))}
      </ListGroup>
    </>
  );
};
