import React, { Component } from 'react';
import './App.css';

import AddItem from './AddItem';
import Items from './Items';
import ModifyItem from './ModifyItem';
import api from './api/api';

require('./icon/iconfont');

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      undone: [],
      done: [],
      show: false,
      modifyIndex: -1,
      nowUndoneStyle: 'priority-up',
      nowDoneStyle: 'date-up',
      undoneCount: -1,
      undoneActive: 1,
      doneCount: -1,
      doneActive: 1,
    }
  }

  getStyle(type) {
    return type === 'undone' ? this.nowUndoneStyle : this.nowDoneStyle;
  }

  updateUndoneState(page=1) {
    api.getTodoList({type: false, page: page}).then(res => {
      const undone = res.data.results.map(item => {
        return {
          ...item,
          date: new Date(item.date)
        }
      })
      const undoneCount = res.data.count;
      this.setState({
        undone,
        undoneCount,
        undoneActive: page
      }, () => {
        const nowUndoneStyle = this.state.nowUndoneStyle;
        const [type1, type2] = nowUndoneStyle.split('-');
        this.handleSort(type1, type2, nowUndoneStyle);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  undonePage(page) {
    this.updateUndoneState(page);
  }

  updateDoneState(page=1) {
    api.getTodoList({type: true, page: page}).then(res => {
      const done = res.data.results.map(item => {
        return {
          ...item,
          date: new Date(item.date)
        }
      })
      const doneCount = res.data.count;
      this.setState({
        done,
        doneCount,
        doneActive: page
      }, () => {
        const nowDoneStyle = this.state.nowDoneStyle;
        const [type1, type2] = nowDoneStyle.split('-');
        this.handleDoneSort(type1, type2, nowDoneStyle);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  donePage(page) {
    this.updateDoneState(page);
  }

  componentDidMount() {
    this.updateUndoneState();
    this.updateDoneState();
  }

  handleSubmit(item) {
    // const undone = this.state.undone.slice();
    // undone.unshift(item);
    // this.setState({
    //   undone
    // });
    api.addTodo(item).then(() => {
      this.updateUndoneState();
    });
  }

  handleAffair(index1, index2) {
    let undone = this.state.undone.slice();
    if (index2 === 2) {
      // 加入已完成
      const doneAddId = undone[index1].id;
      // let done = this.state.done.slice();
      // done.unshift(doneAdd);
      // this.setState({
      //   undone,
      //   done
      // });
      api.markTodoDone({id: doneAddId}).then(() => {
        this.updateUndoneState(this.state.undoneActive);
        this.updateDoneState();
      });
    } else if (index2 === 1) {
      // undone.splice(index1, 1);
      // this.setState({
      //   undone
      // });
      const id = undone[index1].id;
      api.deleteTodo({id}).then(() => {
        this.updateUndoneState(this.state.undoneActive);
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
      // const undone = this.state.undone.slice();
      // undone[this.state.modifyIndex] = item;
      // this.setState({
      //   undone
      // });
      api.modifyTodo(item).then(() => {
        this.updateUndoneState(this.state.undoneActive);
      });
    }
  }

  handleSort(type1, type2, nowStyle) {
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
      undone,
      nowUndoneStyle: nowStyle
    });
  }

  handleDoneSort(type1, type2, nowStyle) {
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
      done,
      nowDoneStyle: nowStyle
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
          count={this.state.undoneCount}
          active={this.state.undoneActive}
          pageChange={this.undonePage.bind(this)}
        />
        <Items 
          type="done"
          items={this.state.done}
          sortItems={this.handleDoneSort.bind(this)}
          count={this.state.doneCount}
          active={this.state.doneActive}
          pageChange={this.donePage.bind(this)}
        />
      </div>
    );
  }
}

export default App;
