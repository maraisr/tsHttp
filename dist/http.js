(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.tsHttp = global.tsHttp || {})));
}(this, function (exports) { 'use strict';

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    babelHelpers;

    exports.HTTP;
    (function (HTTP) {
        var Req = function () {
            function Req(base) {
                babelHelpers.classCallCheck(this, Req);

                this.base = base;
                this.r = new XMLHttpRequest();
            }

            babelHelpers.createClass(Req, [{
                key: "Get",
                value: function Get(ep) {
                    return new Promise(function (resolve) {
                        resolve(new Response());
                    });
                }
            }]);
            return Req;
        }();

        HTTP.Req = Req;

        var Response = function Response() {
            babelHelpers.classCallCheck(this, Response);
        };
    })(exports.HTTP || (exports.HTTP = {}));

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL0hUVFAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBIVFRQO1xuKGZ1bmN0aW9uIChIVFRQKSB7XG4gICAgY2xhc3MgUmVxIHtcbiAgICAgICAgY29uc3RydWN0b3IoYmFzZSkge1xuICAgICAgICAgICAgdGhpcy5iYXNlID0gYmFzZTtcbiAgICAgICAgICAgIHRoaXMuciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgICAgIEdldChlcCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIVFRQLlJlcSA9IFJlcTtcbiAgICBjbGFzcyBSZXNwb25zZSB7XG4gICAgfVxufSkoSFRUUCB8fCAoSFRUUCA9IHt9KSk7XG4iXSwibmFtZXMiOlsiSFRUUCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFXQSxnQkFBSixDQUFQO0FBQ0EsSUFBQSxDQUFDLFVBQVUsSUFBVixFQUFnQjtZQUNQO0FBQ0YsSUFBQSxpQkFERSxHQUNGLENBQVksSUFBWixFQUFrQjtrREFEaEIsS0FDZ0I7O0FBQ2QsSUFBQSxpQkFBSyxJQUFMLEdBQVksSUFBWixDQURjO0FBRWQsSUFBQSxpQkFBSyxDQUFMLEdBQVMsSUFBSSxjQUFKLEVBQVQsQ0FGYzthQUFsQjs7cUNBREU7O29DQUtFLElBQUk7QUFDSixJQUFBLHVCQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFhO0FBQzVCLElBQUEsNEJBQVEsSUFBSSxRQUFKLEVBQVIsRUFENEI7cUJBQWIsQ0FBbkIsQ0FESTs7O21CQUxOO1lBRE87O0FBWWIsSUFBQSxTQUFLLEdBQUwsR0FBVyxHQUFYLENBWmE7O1lBYVA7O1VBYk87S0FBaEIsQ0FBRCxDQWVHQSxpQkFBU0EsZUFBTyxFQUFQLENBQVQsQ0FmSDs7In0=