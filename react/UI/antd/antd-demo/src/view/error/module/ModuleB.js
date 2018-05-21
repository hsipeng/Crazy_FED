import React, {Component} from 'react';

export default class ModuleB extends Component {

	constructor(props) {
		super(props);
		this.state = { counter: 0 };
		this.handleClick = this.handleClick.bind(this);
	  }
	  
	  handleClick() {
		this.setState(({counter}) => ({
		  counter: counter + 1
		}));
	  }
	  
	  render() {
		if (this.state.counter === 5) {
		  // Simulate a JS error
		  throw new Error('I crashed!');
		}
		return <h1>{this.state.counter} <button onClick={this.handleClick}> 点击我到 让左边的数字加到5触发错误</button></h1>;
	  }
	}