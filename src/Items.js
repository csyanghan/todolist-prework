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

  render() {
    return (
      <Card style={{marginTop: '50px'}}>
        <Card.Header>
          {this.props.type === 'done' ? <span>已完成</span> : <span>未完成</span>}
        </Card.Header>
        <ListGroup variant="flush">
          {
            this.props.items.map((item, index) => {
              return (
                <ListGroup.Item key={item.date.toLocaleString()}>
                  <Row>
                    <Col>
                      {item.title}
                      <Badge pill variant="secondary">{item.priority}</Badge>
                      <br/>
                      Expire Day: {item.date.toLocaleString()}
                    </Col>
                    <Col md="auto">
                      <Item 
                        index={index}
                        handleCItemClick={this.handleItemClick.bind(this, index)}
                      />
                    </Col>
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
