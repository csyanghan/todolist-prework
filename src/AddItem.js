import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import DateTimePicker from 'react-datetime-picker';

function nextDay() {
  const currentDate = new Date();
  const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  return nextDay;
}

class AddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: nextDay(), 
      title: '',
      priority: '1'
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
  }

  componentDidMount() {
    const item = this.props.item;
    this.setState(item);
  }

  handleupChange() {
    if (this.props.alwaysUp) {
      this.props.alwaysUp(this.state);
    }
  }

  handleDateChange(date) {
    this.setState({
      date
    }, () => {this.handleupChange()});
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    }, () => {this.handleupChange()});
  }

  handlePriorityChange(e) {
    this.setState({
      priority: e.target.value
    }, () => {this.handleupChange()});
  }

  handleSubmit() {
    this.props.upSubmit(this.state);
    this.setState({
      title: '',
      priority: '1',
      date: nextDay()
    });
  }

  render() {
    return (
      <div className="container">
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control placeholder="Add Todo Item Title" value={this.state.title} onChange={this.handleTitleChange}/>
          </Form.Group>

          <Form.Group controlId="priority">
            <Form.Label>Priority:</Form.Label>
            <Form.Control as="select" value={this.state.priority} onChange={this.handlePriorityChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
            <Form.Text className="text-muted">
              数字越大，优先级越高
            </Form.Text>
          </Form.Group>

          <div>
            <div className="expire-date">
              <Form.Label>Expire Date:</Form.Label><br/>
              <DateTimePicker
                onChange={this.handleDateChange}
                value={this.state.date}
              />
            </div>
            { !this.props.item && (
              <Button variant="primary" onClick={() => this.handleSubmit()}>
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

export default AddItem;
