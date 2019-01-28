import React, { Component } from 'react';
import Item from './item';

import Card from 'react-bootstrap/lib/Card';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Badge from 'react-bootstrap/lib/Badge';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Pagination from 'react-bootstrap/lib/Pagination';

class Items extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStyle: props.type === 'undone' ? 'priority-up' : 'date-up'
    }
  }

  handleItemClick(index1, index2) {
    this.props.affair(index1, index2);
  }

  sortItem(type1, type2) {
    const activeStyle = type1 + '-' + type2;
    this.setState({
      activeStyle
    });
    this.props.sortItems(type1, type2, activeStyle);
  }

  pageChange(number) {
    this.props.pageChange(number);
  }

  render() {
    let items = [];
    for (let number = 1; number <= Math.ceil(this.props.count / 5); number++) {
      items.push(
        <Pagination.Item key={number} active={number === this.props.active} onClick={this.pageChange.bind(this, number)}>
          {number}
        </Pagination.Item>,
      );
    }
    return (
      <div>
      <Card style={{marginTop: '50px'}}>
        <Card.Header>
          <Row>
            <Col>{this.props.type === 'done' ? <span>已完成</span> : <span>未完成</span>}</Col>
            <Col md="auto" className="sort">
              <span>priority: 
                <svg style={{color: (this.state.activeStyle === 'priority-down') ? 'red' : '#212529'}} className="icon" aria-hidden="true" onClick={this.sortItem.bind(this,'priority', 'down')}><use xlinkHref="#icon-sort-ascending"></use></svg>
                <svg style={{color: (this.state.activeStyle === 'priority-up') ? 'red' : '#212529'}} className="icon" aria-hidden="true" onClick={this.sortItem.bind(this, 'priority', 'up')}><use xlinkHref="#icon-sort-descending"></use></svg>
              </span>
              <span>expire:
                <svg style={{color: (this.state.activeStyle === 'date-down') ? 'red' : '#212529'}} className="icon" aria-hidden="true" onClick={this.sortItem.bind(this, 'date', 'down')}><use xlinkHref="#icon-sort-ascending"></use></svg>
                <svg style={{color: (this.state.activeStyle === 'date-up') ? 'red' : '#212529'}} className="icon" aria-hidden="true" onClick={this.sortItem.bind(this, 'date', 'up')}><use xlinkHref="#icon-sort-descending"></use></svg>
              </span>
            </Col>
          </Row>
        </Card.Header>
        <ListGroup variant="flush">
          {
            this.props.items.map((item, index) => {
              return (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col className={this.props.type === 'done' && 'done'}>
                      {item.title}
                      <Badge pill variant="secondary">{item.priority}</Badge>
                      <br/>
                      Expire Day: {item.date.toLocaleString()}
                    </Col>
                    { this.props.type !== 'done' &&
                      <Col md="auto">
                        <Item 
                          index={index}
                          handleCItemClick={this.handleItemClick.bind(this, index)}
                        />
                      </Col>
                    }
                  </Row>
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
      </Card>
      <Pagination style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
        { items }
      </Pagination>
      </div>
    )
  }
}

export default Items;
