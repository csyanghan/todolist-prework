import React, { Component } from 'react';

import Card from 'react-bootstrap/lib/Card';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Badge from 'react-bootstrap/lib/Badge';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Item from './item';

class Items extends Component {

  handleItemClick(index1, index2) {
    this.props.affair(index1, index2);
  }

  sortItem(type1, type2) {
    this.props.sortItems(type1, type2);
  }

  render() {
    return (
      <Card style={{marginTop: '50px'}}>
        <Card.Header>
          <Row>
            <Col>{this.props.type === 'done' ? <span>已完成</span> : <span>未完成</span>}</Col>
            <Col md="auto" className="sort">
              <span>priority: 
                <svg className="icon" aria-hidden="true" onClick={this.sortItem.bind(this,'priority', 'down')}><use xlinkHref="#icon-sort-ascending"></use></svg>
                <svg className="icon" aria-hidden="true" onClick={this.sortItem.bind(this, 'priority', 'up')}><use xlinkHref="#icon-sort-descending"></use></svg>
              </span>
              <span>expire:
                <svg className="icon" aria-hidden="true" onClick={this.sortItem.bind(this, 'date', 'down')}><use xlinkHref="#icon-sort-ascending"></use></svg>
                <svg className="icon" aria-hidden="true" onClick={this.sortItem.bind(this, 'date', 'up')}><use xlinkHref="#icon-sort-descending"></use></svg>
              </span>
            </Col>
          </Row>
        </Card.Header>
        <ListGroup variant="flush">
          {
            this.props.items.map((item, index) => {
              return (
                <ListGroup.Item key={item.date.toLocaleString()}>
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
    )
  }
}

export default Items;
