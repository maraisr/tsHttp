(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.HTTP = global.HTTP || {})));
}(this, function (exports) { 'use strict';

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers;

    exports.HTTP;
    (function (HTTP) {
        var Get = function Get() {
            babelHelpers.classCallCheck(this, Get);
        };

        HTTP.Get = Get;
    })(exports.HTTP || (exports.HTTP = {}));

}));