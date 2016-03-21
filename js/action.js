//1、翻面控制
function turn(elem){
  var cls = elem.className;
  var n = elem.id.split('_')[1];//var n = elem.id.substr(-1, 1)，但是不推荐 substr;
  if(/photo_center/.test(cls) == false){//判断当前点击的元素是不是 photo_center，不是的话不执行后面的翻转而进行海报排序
      return rsort(n);
  }else
  if(/photo_front/.test(cls) == true){
    cls = cls.replace(/photo_front/, 'photo_back');
    g('#nav_' + n).className += ' i_back';//同时处理控制按钮
  }else{
    cls = cls.replace(/photo_back/, 'photo_front');
    g('#nav_' + n).className = g('#nav_' + n).className.replace(/\s*i_back\s*/, ' ');//同时处理控制按钮
  }
  return elem.className = cls;
}

//3、通用函数
function g(selector){
  return selector.substring(0, 1) == '.' ? document.getElementsByClassName(selector.substring(1)) : document.getElementById(selector.substring(1));
}

//随机生成一个值 0-20
function random( range ){
  var max = Math.max(range[0], range[1]);
  var min = Math.min(range[0], range[1]);


  var diff = max - min;
  var number = Math.ceil(Math.random()*diff + min);
  return number;
}

//4、输出所有海报
var data = data;
function addPhotos(){

  var template = g('#wrap').innerHTML;
  var html = [];
  var nav = [];

  for(s in data){
    var _html = template.replace('{{index}}',s)
                        .replace('{{img}}',data[s].img)
                        .replace('{{caption}}',data[s].caption)
                        .replace('{{desc}}',data[s].desc);
    html.push(_html);
    nav.push('<span id="nav_'+s+'"  onclick="turn( g(\'#photo_'+s+'\'))" class="i">&nbsp;</span>');
  }
  html.push('<div class = "nav">'+nav.join('')+'</div>');
  g('#wrap').innerHTML = html.join('');
  rsort(random([0,data.length])-1);
}
addPhotos();

//5、排序海报
function rsort(n){
  var _photo = g('.photo');
  var photos = [];
  for(var s = 0; s<_photo.length; s++){
    _photo[s].className = 'photo photo_front';
    /*重排序之前去除所有图片样式*/
    _photo[s].style.left = '';
    _photo[s].style.top = '';
    _photo[s].style['transform'] = _photo[s].style['-webkit-transform'] = 'rotate(360deg) scale(1.3)';
    photos.push(_photo[s]);
  }

  var photo_center = g('#photo_'+n);
  photo_center.className = photo_center.className + ' photo_center';
  photo_center = photos.splice(n,1)[0];

  //把海报分为左右两个区域
  var photos_left = photos.splice(0,Math.ceil(photos.length/2));
  var photos_right = photos;
  var ranges = range();
  // 对左右区域的海报位置进行随机赋值
  for(var j = 0; j < photos_left.length; j++){
    var photo = photos_left[j];

    photos_left[j].style.left = random(ranges.left.x)+'px';
    photo.style.top = random(ranges.left.y)+'px';
    photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
  }
  for(var s = 0; s < photos_right.length; s++){
    var photo = photos_right[s];

    photo.style.left = random(ranges.right.x)+'px';
    photo.style.top = random(ranges.right.y)+'px';
    photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
  }
  //控制按钮处理
  var navs = g('.i');
  for(var s = 0; s< navs.length;s++){
    navs[s].className = 'i';
  }

  g('#nav_'+n).className += ' i_current ';

}

//6、计算左右分区的范围
function range(){
  var range = {
    left:{x: [],y: []},
    right:{x: [],y: []}
  }
  //获取最外围容器的宽度和高度
  var wrap = {
    w: g('#wrap').clientWidth,
    h: g('#wrap').clientHeight
  }
  //获取每一张海报的宽度和高度，因为海报的大小都是一样的，所以取第一张
  var photo = {
    w: g('.photo')[0].clientWidth,
    h: g('.photo')[0].clientHeight
  }
  range.wrap = wrap;
  range.photo = photo;

  //左区域范围
  range.left.x = [ 0, wrap.w/2-photo.w/2];
  range.left.y = [ 0, wrap.h - photo.h/2];
  //右区域范围
  range.right.x = [ wrap.w/2+photo.w/2, wrap.w];
  range.right.y = range.left.y;

  return range;

}




















