import React from 'react'
import './style/index.less'

export default class ErrorFallBack extends React.PureComponent {

    render() {
        let {text="组件加载错误",width='100%',height='100px'} = this.props

        return (
            <div className="noData" style={{width:width,height:height}}>
                <p>
                    <span className="sins">{text}</span>
                </p>
            </div>
        )
    }
}