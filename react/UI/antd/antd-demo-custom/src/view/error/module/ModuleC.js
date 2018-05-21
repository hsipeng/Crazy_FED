import React, {Component} from 'react';

export default class ModuleC extends Component {

	constructor(props) {
		super(props);
		this.state = { error: null };
		this.handleClick.bind(this)
	  }
	 
	handleClick = () => {
		try {
		  // Do something that could throw
		  throw new Error('Catch some Error.!!!')
		} catch (error) {
		  this.setState({ error: error });
		}
	}
	 
	render() {
		if (this.state.error) {
		  return <h1>Meet Some Errors.</h1>
		}
		return <div onClick={this.handleClick}><button>Click Me</button></div>
	  }
}