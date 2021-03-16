

import React, { Component } from 'react';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      list: [],
    };
  }

  onChangeValue = event => {
    this.setState({ value: event.target.value });
  };

  onAddItem = () => {
    this.setState(state => {      
      // const list = state.list.concat(state.value);
      const list = [...state.list, state.value];
      return {
        list,
        value: '',
      };
    });
  };

  render() {
    const lists = this.state.list;
    return (
      <div>
        <ul>
          {lists.map(item => {
            <li key={item}>{item}</li>
            console.log(lists);
          })}
        </ul>

        <input
          type="text"
          value={this.state.value}
          onChange={this.onChangeValue}
        />
        <div style={{color:'red'}}>{this.state.value}</div>
        <button
          type="button"
          onClick={this.onAddItem}
          disabled={!this.state.value}
        >
          Add
        </button>
      </div>
    );
  }
}
export default Demo