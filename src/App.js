import React, { Component } from 'react';
import './App.css';

import AddItem from './AddItem';
import Items from './Items';

require('./icon/iconfont');

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      undone: [],
      done: []
    }
  }

  handleSubmit(item) {
    const undone = this.state.undone.slice();
    undone.push(item);
    this.setState({
      undone
    });
  }

  handleAffair(index1, index2) {
    let undone = this.state.undone.slice();
    if (index2 === 1) {
      // delete
      const doneAdd = undone.splice(index1, 1);
      let done = this.state.done.slice();
      done = done.concat(doneAdd);
      this.setState({
        undone,
        done
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>To-do-list Prework</h1>
        <AddItem
          upSubmit={this.handleSubmit}
        />
        <Items
          type="undone"
          items={this.state.undone}
          affair={this.handleAffair.bind(this)}
        />
        <Items 
          type="done"
          items={this.state.done}
        />
      </div>
    );
  }
}

export default App;
