var TOOLS = {};
TOOLS.getUrlAttribute = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
/**
 * 获取图片
 */
TOOLS.loadImg = function (manifest, cb) {
    var queue = this.queue = new createjs.LoadQueue(false, "./");

    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);

    function handleComplete() {
        cb();
    }
};
//显示图片
TOOLS.bitmap = function (id) {
    var bitmap = new createjs.Bitmap(this.queue.getResult(id));
    bitmap.width = bitmap.image.width;
    bitmap.height = bitmap.image.height;
    return bitmap;
}
//判断是否为ios设备
TOOLS.isIos = function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isIos;
},

    /**
     * unicode 解码
     * @param str
     */
    TOOLS.hexToDec = function (str) {
        str = str.replace(/\\/g, "%");
        return this.htmlDecode(unescape(str));
    },

    /**
     * unicode 编码
     * @param str
     * @returns {string}
     */
    TOOLS.decToHex = function (str) {
        var res = [];
        for (var i = 0; i < str.length; i++)
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        return "\\u" + res.join("\\u");
    },
    /**
     * html实体转换
     * @param str
     * @returns {string}
     */
    TOOLS.htmlDecode = function (str) {
        var s = "";
        if (str.length == 0) return s;
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    }


export default TOOLS;