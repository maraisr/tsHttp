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
                key: 'get',
                value: function get(ep) {
                    var _this = this;

                    return new Promise(function (resolve) {
                        _this.r.open('GET', _this.base + ep, true);
                        _this.r.setRequestHeader('Accept', 'application/json');
                        _this.r.send(null);
                        _this.r.addEventListener('readystatechange', function () {
                            if (_this.r.readyState == _this.r.DONE) {
                                resolve(new Response(_this.r));
                            }
                        });
                    });
                }
            }]);
            return Req;
        }();

        HTTP.Req = Req;

        var Response = function () {
            function Response(r) {
                babelHelpers.classCallCheck(this, Response);

                this.isJson = false;
                this.response = r.responseText;
                try {
                    if (r.getResponseHeader('Content-Type') == 'application/json') {
                        this.isJson = true;
                    }
                } catch (e) {}
            }

            babelHelpers.createClass(Response, [{
                key: 'payload',
                get: function get() {
                    if (this.isJson) {
                        return JSON.parse(this.response);
                    }
                    return this.response;
                }
            }]);
            return Response;
        }();
    })(exports.HTTP || (exports.HTTP = {}));

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL0hUVFAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBIVFRQO1xuKGZ1bmN0aW9uIChIVFRQKSB7XG4gICAgY2xhc3MgUmVxIHtcbiAgICAgICAgY29uc3RydWN0b3IoYmFzZSkge1xuICAgICAgICAgICAgdGhpcy5iYXNlID0gYmFzZTtcbiAgICAgICAgICAgIHRoaXMuciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgICAgIGdldChlcCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZSArIGVwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnIuc2VuZChudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuci5yZWFkeVN0YXRlID09IHRoaXMuci5ET05FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZSh0aGlzLnIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSFRUUC5SZXEgPSBSZXE7XG4gICAgY2xhc3MgUmVzcG9uc2Uge1xuICAgICAgICBjb25zdHJ1Y3RvcihyKSB7XG4gICAgICAgICAgICB0aGlzLmlzSnNvbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJykgPT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNKc29uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHBheWxvYWQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0pzb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgfVxufSkoSFRUUCB8fCAoSFRUUCA9IHt9KSk7XG4iXSwibmFtZXMiOlsiSFRUUCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFXQSxnQkFBSixDQUFQO0FBQ0EsSUFBQSxDQUFDLFVBQVUsSUFBVixFQUFnQjtZQUNQO0FBQ0YsSUFBQSxpQkFERSxHQUNGLENBQVksSUFBWixFQUFrQjtrREFEaEIsS0FDZ0I7O0FBQ2QsSUFBQSxpQkFBSyxJQUFMLEdBQVksSUFBWixDQURjO0FBRWQsSUFBQSxpQkFBSyxDQUFMLEdBQVMsSUFBSSxjQUFKLEVBQVQsQ0FGYzthQUFsQjs7cUNBREU7O29DQUtFLElBQUk7OztBQUNKLElBQUEsdUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQWE7QUFDNUIsSUFBQSwwQkFBSyxDQUFMLENBQU8sSUFBUCxDQUFZLEtBQVosRUFBbUIsTUFBSyxJQUFMLEdBQVksRUFBWixFQUFnQixJQUFuQyxFQUQ0QjtBQUU1QixJQUFBLDBCQUFLLENBQUwsQ0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxrQkFBbEMsRUFGNEI7QUFHNUIsSUFBQSwwQkFBSyxDQUFMLENBQU8sSUFBUCxDQUFZLElBQVosRUFINEI7QUFJNUIsSUFBQSwwQkFBSyxDQUFMLENBQU8sZ0JBQVAsQ0FBd0Isa0JBQXhCLEVBQTRDLFlBQU07QUFDOUMsSUFBQSw0QkFBSSxNQUFLLENBQUwsQ0FBTyxVQUFQLElBQXFCLE1BQUssQ0FBTCxDQUFPLElBQVAsRUFBYTtBQUNsQyxJQUFBLG9DQUFRLElBQUksUUFBSixDQUFhLE1BQUssQ0FBTCxDQUFyQixFQURrQzs2QkFBdEM7eUJBRHdDLENBQTVDLENBSjRCO3FCQUFiLENBQW5CLENBREk7OzttQkFMTjtZQURPOztBQW1CYixJQUFBLFNBQUssR0FBTCxHQUFXLEdBQVgsQ0FuQmE7O1lBb0JQO0FBQ0YsSUFBQSxpQkFERSxRQUNGLENBQVksQ0FBWixFQUFlO2tEQURiLFVBQ2E7O0FBQ1gsSUFBQSxpQkFBSyxNQUFMLEdBQWMsS0FBZCxDQURXO0FBRVgsSUFBQSxpQkFBSyxRQUFMLEdBQWdCLEVBQUUsWUFBRixDQUZMO0FBR1gsSUFBQSxnQkFBSTtBQUNBLElBQUEsb0JBQUksRUFBRSxpQkFBRixDQUFvQixjQUFwQixLQUF1QyxrQkFBdkMsRUFBMkQ7QUFDM0QsSUFBQSx5QkFBSyxNQUFMLEdBQWMsSUFBZCxDQUQyRDtxQkFBL0Q7aUJBREosQ0FLQSxPQUFPLENBQVAsRUFBVSxFQUFWO2FBUko7O3FDQURFOztvQ0FXWTtBQUNWLElBQUEsb0JBQUksS0FBSyxNQUFMLEVBQWE7QUFDYixJQUFBLDJCQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssUUFBTCxDQUFsQixDQURhO3FCQUFqQjtBQUdBLElBQUEsdUJBQU8sS0FBSyxRQUFMLENBSkc7OzttQkFYWjtZQXBCTztLQUFoQixDQUFELENBc0NHQSxpQkFBU0EsZUFBTyxFQUFQLENBQVQsQ0F0Q0g7OyJ9