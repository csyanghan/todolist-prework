import React from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

function tooltip(index) {
  if (index === 0) {
    return '编辑';
  } else if (index === 1) {
    return '删除';
  } else if (index === 2) {
    return '标记为已完成'
  }
}

class Item extends React.Component {

  handleCItemClick(index) {
    this.props.handleCItemClick(index);
  }

  render() {
    return (
      <div>
        {['#icon-edit-square', '#icon-delete', '#icon-carryout'].map((placement, index) => (
          <OverlayTrigger
            key={placement}
            overlay={
              <Tooltip>
                { tooltip(index) }
              </Tooltip>
            }
          >
            <svg className="icon" aria-hidden="true" onClick={this.handleCItemClick.bind(this, index)}><use xlinkHref={`${placement}`}></use></svg>
          </OverlayTrigger>
        ))}
      </div>
    )
  }
}

export default Item;
