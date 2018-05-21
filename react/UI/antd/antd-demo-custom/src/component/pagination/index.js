import React, { Component } from 'react';
import { Pagination } from 'antd';

export default class Page extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
      }
    render() {
        return(
            <Pagination showSizeChanger showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
        )
    }
}
