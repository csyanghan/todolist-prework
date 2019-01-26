import React, { Component } from 'react';
import './App.css';

import AddItem from './AddItem';
import Items from './Items';
import ModifyItem from './ModifyItem';

require('./icon/iconfont');

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      undone: [],
      done: [],
      show: false,
      modifyIndex: -1
    }
  }

  handleSubmit(item) {
    const undone = this.state.undone.slice();
    undone.unshift(item);
    this.setState({
      undone
    });
  }

  handleAffair(index1, index2) {
    let undone = this.state.undone.slice();
    if (index2 === 2) {
      // 加入已完成
      const doneAdd = undone.splice(index1, 1)[0];
      let done = this.state.done.slice();
      done.unshift(doneAdd);
      this.setState({
        undone,
        done
      });
    } else if (index2 === 1) {
      undone.splice(index1, 1);
      this.setState({
        undone
      });
    } else if (index2 === 0) {
      this.setState({
        show: true,
        modifyIndex: index1
      });
    }
  }

  handleClose(show, item) {
    this.setState({
      show
    });
    if (item) {
      const undone = this.state.undone.slice();
      undone[this.state.modifyIndex] = item;
      this.setState({
        undone
      });
    }
  }

  handleSort(type1, type2) {
    const undone = this.state.undone.slice();
    undone.sort((a, b) => {
      if (a[type1] < b[type1]) {
        if (type2 === 'down') {
          return -1;
        } else if (type2 === 'up') {
          return 1;
        }
      } else {
        if (type2 === 'down') {
          return 1;
        } else if (type2 === 'up') {
          return -1;
        }
      }
      return 0;
    });
    this.setState({
      undone
    });
  }

  handleDoneSort(type1, type2) {
    const done = this.state.done.slice();
    done.sort((a, b) => {
      if (a[type1] < b[type1]) {
        if (type2 === 'down') {
          return -1;
        } else if (type2 === 'up') {
          return 1;
        }
      } else {
        if (type2 === 'down') {
          return 1;
        } else if (type2 === 'up') {
          return -1;
        }
      }
      return 0;
    });
    this.setState({
      done
    });
  }

  render() {
    return (
      <div className="container">
        <h1>To-do-list Prework</h1>
        <AddItem
          upSubmit={this.handleSubmit}
        />
        <ModifyItem
          item={this.state.undone[this.state.modifyIndex]}
          show={this.state.show}
          handleModal={this.handleClose.bind(this)}
        />
        <Items
          type="undone"
          items={this.state.undone}
          affair={this.handleAffair.bind(this)}
          sortItems={this.handleSort.bind(this)}
        />
        <Items 
          type="done"
          items={this.state.done}
          sortItems={this.handleDoneSort.bind(this)}
        />
      </div>
    );
  }
}

export default App;
