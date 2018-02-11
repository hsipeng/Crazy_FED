import React from 'react';
import ReactDOM from 'react-dom'
import './app.css'
import $ from 'jquery';
import Moment from 'moment'
import { fail } from 'assert';

function get(url) {
   return Promise.resolve($.ajax(url));
 }
 
 function formateTime(timestamp) {
  timestamp = timestamp.toString().slice(0,10);
  timestamp = timestamp.replace(/^\s+|\s+$/, '');
  if (/^\d{10}$/.test(timestamp)) {
    timestamp *= 1000;
  } else if (/^\d{13}$/.test(timestamp)) {
    timestamp = parseInt(timestamp);
  } else {
    // alert('时间戳格式不正确！');
    return;
  }
  var YmdHis = Moment(timestamp).format('YYYY-MM-DD');
  return YmdHis;
}

//文件大小的转换
function bytesToSize(bytes) {
  if (bytes === 0) return '0 B';
  var k = 1000, // or 1024
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

 return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

class FileRow extends React.Component {
  

  render() {
    const file = this.props.file;
    const title = file.title;
    const fileSize = bytesToSize(file.fsize);
    const putTime = formateTime(file.putTime);
    const url = file.url;
    return (
      <li><h3>{title}</h3>
      链接:<a href={url} target="_blank">查看</a><br/>
      大小:<span>{fileSize}</span><br/>
      时间:<span>{putTime}</span></li>
    );
  }
}

class FilesTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const files = [];

    this.props.filesList.forEach((file) => {
      if(file.title.toString().toLowerCase().indexOf(filterText.toString().toLowerCase()) === -1) {
        return;
      }

      files.push(
        <FileRow file={file}/>
      );
    })


    return (
      <ul>
        {files}
      </ul>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleFileTypeChange(e) {
    this.props.onFileTypeChange(e.target.value);
  }
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
        <lable>
          pdf:
          <input 
            type="radio"
            value="pdf"
            checked={this.props.fileType === 'pdf'}
            onChange={(e) => this.handleFileTypeChange(e)}
           />
        </lable>
        <lable>
          zip:
          <input 
            type="radio"
            value="zip"
            checked={this.props.fileType === 'zip'}
            onChange={(e) => this.handleFileTypeChange(e)}
           />
        </lable>
        </p>
      </form>
    );
  }

}


class FilterableFilesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      fileType: 'pdf',
      fileList: []
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
  }

  getInitialState() {
    return {
      filterText: '',
      fileType: 'pdf',
      fileList: []
    };
  }

  componentDidMount() {
    this.serverRequest = $.get('https://api.lirawx.cn/listfile.php?prefix=pdf', function (result) {
      this.setState({
        fileList: JSON.parse(result)
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleFileTypeChange(fileType) {
    this.setState({
      fileType: fileType
    });
    this.serverRequest = $.get('https://api.lirawx.cn/listfile.php?prefix='+ fileType, function (result) {
      this.setState({
        fileList: JSON.parse(result)
      });
    }.bind(this));
  }

  render() {
    return(
      <div>
      <SearchBar
       filterText={this.state.filterText}
       fileType={this.state.fileType}
       onFilterTextChange={this.handleFilterTextChange}
       onFileTypeChange={this.handleFileTypeChange}
      />
      <FilesTable
       filesList={this.state.fileList}
       filterText={this.state.filterText}
       fileType={this.state.fileType}
      />
    </div>
    )
  }
}

class UploadFile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      token: ''
    };
    this.handleFileSelectChange = this.handleFileSelectChange.bind(this);
  }

  getInitialState() {
    return {
      token: ''
    };
  }

  componentDidMount() {
    this.serverRequest = $.get('https://api.lirawx.cn/upload_tokens.php', function (result) {
      this.setState({
        token: JSON.parse(result).uptoken
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  handleFileSelectChange(e) {
    var self = this;
    let file = e.target.value;
    let formData = new FormData();
    let pre = file.match(/\.?[^.\/]+$/).toString().substr(1);
    if([
      'zip', 'pdf'].
      indexOf(pre.toLowerCase().toLowerCase()) === -1){
        alert('后缀不正确，请上传zip 或者 pdf 文件格式');
        return;
      }
    let fileName = file.match(/[^\\/:*?"<>|\r\n]+$/);
    let key = pre + fileName;
    $('.selected-file').html(fileName);
    formData.append('file', e.target.files[0])
    formData.append('key', key);
    formData.append('token', this.state.token);
    formData.append('accept', '');
    var domain = "http://cdn.lirawx.cn/"; // you bucket domain
    // $.ajax({
    //   url: 'http://upload.qiniu.com/', // Different bucket zone has different upload url, you can get right url by the browser error massage when uploading a file with wrong upload url.
    //   type: 'POST',
    //   data: formData,
    //   processData: false,
    //   contentType: false,
    //   success: function(res) {
        
    //     console.log("成功：" + JSON.stringify(res));
    //     var str = '<span>已上传：' + res.key + '</span>';
    //     str += '访问地址: <a href="' + domain + res.key + '">' + domain + res.key + '</a>';

    //     $('.uploaded-result').html(str);
    //   },
    //   error: function(res) {
    //     console.log("失败:" + JSON.stringify(res));
    //     $('.uploaded-result').html('上传失败：' + res.responseText);
    //   }
    // });

    const xhr = new XMLHttpRequest();
    this.xhr = xhr
    xhr.upload.addEventListener('progress', function(e){
      // console.log(e);
      if (e.lengthComputable) {
        var percent = e.loaded / e.total * 100;
        $(".progress").html('上传：' + e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
      }
    }, false);  // 第三个参数为useCapture?，是否使用事件捕获/冒泡

    // xhr.addEventListener('load',uploadComplete,false);
    xhr.addEventListener('error',function(e) {
      $('.uploaded-result').html('上传失败：' + res.responseText);
    },false);
    xhr.addEventListener('readystatechange', function(){
      if(xhr.readyState === XMLHttpRequest.DONE){
        let res = JSON.parse(xhr.responseText);
          var str = '<span>已上传：' + res.key + '</span>';
          str += '访问地址: <a href="' + domain + res.key + '">' + domain + res.key + '</a>';
          $('.uploaded-result').html(str);

      $.get('https://api.lirawx.cn/upload_tokens.php', function (result) {
      this.setState({
        token: JSON.parse(result).uptoken
      });
    }.bind(self));
      }
    }, false);
    // xhr.addEventListener('abort',uploadCancel,false)
    xhr.open('POST', 'http://upload.qiniu.com/', true);  // 第三个参数为async?，异步/同步
    xhr.send(formData);
    
  }

  render() {
    return(
      <div className="uploadBlock">
      <form className="uploadForm" method="post">
        <input id="uploadFile" name="file" type="file" onChange={this.handleFileSelectChange}/>
      </form>

      <label className="btn-upload" htmlFor="uploadFile">
        <span></span>
        <em>添加文件</em>
      </label>

      <div className="selected-file"></div>
      <div className="progress"></div>
      <div className="uploaded-result"></div>
      </div>
    )
  }
}
class QiniuFileManage extends React.Component {
  render() {
    return (
      <div>
      <div className="file-upload">
    <div className="title">七牛文件管理 </div>
      <UploadFile/>
      </div>
   <FilterableFilesTable/>
   </div>
    )
  }
}

ReactDOM.render(
  <QiniuFileManage/> ,
   document.getElementById('container')
);