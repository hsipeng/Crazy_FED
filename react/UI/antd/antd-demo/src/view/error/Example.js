import React, {Component} from 'react';
import ModuleA from './module/ModuleA'
import ModuleB from './module/ModuleB'
import ModuleC from './module/ModuleC'
import ModuleD from './module/ModuleD'
import ErrorBoundary from './handle/index'

export default class Example extends Component {

	render() {
		
		return (
			<div>
				<ErrorBoundary><ModuleA/></ErrorBoundary>
                <ModuleB title={this.props.title}/>
                <ModuleC/>
                <ModuleD/>
			</div>
		)
	}
}