import React from 'react';
import AddItem from './AddItem';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class ModifyItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.item);
  }

  handleClose(save) {
    if (save === 'save') {
      this.props.handleModal(false, this.state);
    } else {
      this.props.handleModal(false);
    }
  }

  handleChangeState(item) {
    this.setState(item)
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose.bind(this, 'close')}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Todo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddItem 
            item={this.state}
            alwaysUp={this.handleChangeState}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this, 'close')}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose.bind(this, 'save')}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModifyItem;
