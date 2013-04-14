var urllib = require('urllib');

// http://mp.weixin.qq.com/wiki/index.php?title=%E8%BF%94%E5%9B%9E%E7%A0%81%E8%AF%B4%E6%98%8E
var wrapper = function (callback) {
  return function (err, data) {
    if (err) {
      return callback(err);
    }
    if (data.errcode) {
      return callback(new Error(data.errmsg));
    }
    callback(null, data);
  };
};

/**
 * 根据appid和appsecret获取access token
 * @param {String} appid appid
 * @param {String} appsecret secret
 * @param {Function} callback 回调函数
 */
exports.getAccessToken = function (appid, appsecret, callback) {
  var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret;
  urllib.request(url, {dataType: 'json'}, wrapper(callback));
};

/**
 * 创建菜单
 * @param  {[type]}   token    [description]
 * @param  {[type]}   menu     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.createMenu = function (token, menu, callback) {
  var url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token;
  var args = {
    dataType: 'json',
    type: 'POST',
    data: menu,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  urllib.request(url, args, wrapper(callback));
};

exports.getMenu = function (token, menu, callback) {
  var url = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=' + token;
  urllib.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.removeMenu = function (token, callback) {
  var url = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=' + token;
  urllib.request(url, {dataType: 'json'}, wrapper(callback));
};

var Menu = function () {
  this.buttons = [];
};

Menu.prototype.addButton = function (button, subButtons) {
  if (subButtons) {
    delete button.type;
    delete button.key;
    button.sub_button = subButtons;
  }
  this.buttons.push(button);
  return this;
};

Menu.prototype.toString = function () {
  return JSON.stringify({"button": this.buttons});
};

exports.Menu = Menu;
