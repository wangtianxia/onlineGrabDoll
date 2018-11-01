import $ from 'jquery';

var Ajax = function () {
    this.initialize();
};
var p = Ajax.prototype;
p.initialize = function () {
    this._waiting = false;
    this._stop = false;
    this._url = null;
    this._callback = null;
    this._waitTime = 0;
    this._parameters = null;
    this._reStartCount = 0;
};

p._send = function (dataType, type, timeout) {
    var url = this._url, data = this._parameters, callback = this._callback, self = this;
    $.ajax({
        dataType: dataType || "json",
        type: type || "GET",
        timeout: timeout || 30000,
        async: true,
        url: url,
        data: data,

        beforeSend: function () {
            self._waiting = true;
        },

        success: function (res) {
            if (self._stop) return;
            self._stop = true;
            self._reStartCount = 0;
            if (callback) callback.call(self, res);
        },

        complete: function () {
            self._waiting = false;
        },

        error: function (jqXHR, textStatus, errorThrown) {
            if (self._stop) return;
            self._stop = true;
            if (callback) callback.call('err');
        }
    });
};

p.sendJSON = function (url, _parameters, callback, onError, onFail, type, dataType) {
    if (!url || this._waiting) return;
    this._stop = false;
    this._url = url;
    this._callback = callback;
    this._onError = onError;
    this._onFail = onFail;
    this._parameters = _parameters;
    this._send(dataType || "jsonp", type || "get", 15000);
};
p.reStart = function () {
    this._stop = false;
    this._send("json", "get", 10000);
    ++this._reStartCount;
};

export default Ajax;
