var wechat = process.env.WEIXIN_COV ? require('./lib-cov/wechat') : require('./lib/wechat');
wechat.List = process.env.WEIXIN_COV ? require('./lib-cov/list') : require('./lib/list');
wechat.API = process.env.WEIXIN_COV ? require('./lib-cov/common') : require('./lib/common');
module.exports = wechat;
