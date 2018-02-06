 import React from 'react';
 import NewsHeader from './NewsHeader.js';
 import NewsItem from './NewsItem.js';
 import './NewsList.css'
 export default class NewsList extends React.Component {
  render() {
    return (
        <div className="newsList">
          <NewsHeader />
          <div className="newsList-newsItem">
            {
              (this.props.items).map(function(item, index) {
                return (
                    <NewsItem key={item.id} item={item} rank={index+1} />
                    );
              })
            }
          </div>
        </div>
        );
  }
 }
