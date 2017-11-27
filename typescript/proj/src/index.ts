import  './style.css';
import  './sass.scss';
import './less.less';
import  './css/font-awesome.css';

function area (shape: string, width : number, height :number) {
  var area = width * height;
  return "I'm a " + shape + "width an area of " + area +"cm squared."
}

document.getElementById('area').innerHTML = area("rectangle", 30, 15);
