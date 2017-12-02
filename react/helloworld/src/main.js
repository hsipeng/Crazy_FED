import React from 'react'
import ReactDOM from 'react-dom'
import {
    AppContainer
} from 'react-hot-loader'
import App from './App'
const render = (App) => {
    ReactDOM.render(
        <AppContainer>
      <App />
    </AppContainer>,
        document.getElementById('app')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => render(App))
}

//定时更新
//
// function tick() {
//     const element = (
//         <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//     );
//     ReactDOM.render(
//         element,
//         document.getElementById('root')
//     );
// }

// setInterval(tick, 1000);
//
//
// 函数形式 组件

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
            <div>
                <h1>Hello world11!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
}


function tick() {
    ReactDOM.render(
        <Clock/>,
        document.getElementById('root')
    );
}

tick();
