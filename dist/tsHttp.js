(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.tsHttp = global.tsHttp || {})));
}(this, function (exports) { 'use strict';

    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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
        var Client = function () {
            function Client(base) {
                babelHelpers.classCallCheck(this, Client);

                this.base = base;
            }

            babelHelpers.createClass(Client, [{
                key: 'get',
                value: function get(ep) {
                    var params = arguments.length <= 1 || arguments[1] === undefined ? void {} : arguments[1];

                    return new Request('GET', { base: this.base, ep: ep, params: params }).send();
                }
            }]);
            return Client;
        }();

        HTTP.Client = Client;

        var Request = function () {
            function Request(method, url) {
                babelHelpers.classCallCheck(this, Request);

                this.method = method;
                this.url = url;
                this.r = new XMLHttpRequest();
            }

            babelHelpers.createClass(Request, [{
                key: 'send',
                value: function send() {
                    var _this = this;

                    return new Promise(function (resolve, reject) {
                        _this.r.open(_this.method, Request.buildQuery(_this.url.base, _this.url.ep, _this.url.params), true);
                        _this.r.setRequestHeader('Accept', 'application/json');
                        _this.r.send(null);
                        _this.r.addEventListener('readystatechange', function () {
                            if (_this.r.readyState == _this.r.DONE) {
                                resolve(new Response(_this.r));
                            }
                        });
                    });
                }
            }], [{
                key: 'enParam',
                value: function enParam(params) {
                    var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

                    var r = new Array();
                    for (var p in params) {
                        var k = prefix != '' ? prefix + '[' + p + ']' : p,
                            v = params[p];
                        if (!(v == null || (typeof v === 'undefined' ? 'undefined' : babelHelpers.typeof(v)) == void 0)) {
                            r.push((typeof v === 'undefined' ? 'undefined' : babelHelpers.typeof(v)) == 'object' ? Request.enParam(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
                        }
                    }
                    return r.join('&');
                }
            }, {
                key: 'buildQuery',
                value: function buildQuery(base, ep, params) {
                    return base.replace(/\/+$/, '') + '/' + ep.replace(/^\/+/, '') + (params == void {} ? '' : '?' + Request.enParam(params));
                }
            }]);
            return Request;
        }();

        HTTP.Request = Request;

        var Response = function Response(r) {
            babelHelpers.classCallCheck(this, Response);

            this.isJson = false;
            this.json = void 0;
            this.response = r.responseText;
            this.statusCode = r.status;
            try {
                this.isJson = true;
                this.json = JSON.parse(this.response);
            } catch (e) {}
        };
    })(exports.HTTP || (exports.HTTP = {}));

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNIdHRwLmpzIiwic291cmNlcyI6WyIuLi90bXAvSFRUUC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEhUVFA7XG4oZnVuY3Rpb24gKEhUVFApIHtcbiAgICBjbGFzcyBDbGllbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcihiYXNlKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2UgPSBiYXNlO1xuICAgICAgICB9XG4gICAgICAgIGdldChlcCwgcGFyYW1zID0gdm9pZCB7fSkge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgUmVxdWVzdCgnR0VUJywgeyBiYXNlOiB0aGlzLmJhc2UsIGVwOiBlcCwgcGFyYW1zOiBwYXJhbXMgfSkpLnNlbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIVFRQLkNsaWVudCA9IENsaWVudDtcbiAgICBjbGFzcyBSZXF1ZXN0IHtcbiAgICAgICAgY29uc3RydWN0b3IobWV0aG9kLCB1cmwpIHtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgICAgICB0aGlzLnIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZW5QYXJhbShwYXJhbXMsIHByZWZpeCA9ICcnKSB7XG4gICAgICAgICAgICB2YXIgciA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9ICgocHJlZml4ICE9ICcnKSA/IChwcmVmaXggKyAnWycgKyBwICsgJ10nKSA6IHApLCB2ID0gcGFyYW1zW3BdO1xuICAgICAgICAgICAgICAgIGlmICghKHYgPT0gbnVsbCB8fCB0eXBlb2YgdiA9PSB2b2lkIDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHIucHVzaCgodHlwZW9mIHYgPT0gJ29iamVjdCcpID8gUmVxdWVzdC5lblBhcmFtKHYsIGspIDogZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gci5qb2luKCcmJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGJ1aWxkUXVlcnkoYmFzZSwgZXAsIHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyBlcC5yZXBsYWNlKC9eXFwvKy8sICcnKSArIChwYXJhbXMgPT0gdm9pZCB7fSA/ICcnIDogJz8nICsgUmVxdWVzdC5lblBhcmFtKHBhcmFtcykpO1xuICAgICAgICB9XG4gICAgICAgIHNlbmQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuci5vcGVuKHRoaXMubWV0aG9kLCBSZXF1ZXN0LmJ1aWxkUXVlcnkodGhpcy51cmwuYmFzZSwgdGhpcy51cmwuZXAsIHRoaXMudXJsLnBhcmFtcyksIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5zZW5kKG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yLnJlYWR5U3RhdGUgPT0gdGhpcy5yLkRPTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKHRoaXMucikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIVFRQLlJlcXVlc3QgPSBSZXF1ZXN0O1xuICAgIGNsYXNzIFJlc3BvbnNlIHtcbiAgICAgICAgY29uc3RydWN0b3Iocikge1xuICAgICAgICAgICAgdGhpcy5pc0pzb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuanNvbiA9IHZvaWQgMDtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSByLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzQ29kZSA9IHIuc3RhdHVzO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSnNvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5qc29uID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KShIVFRQIHx8IChIVFRQID0ge30pKTtcbiJdLCJuYW1lcyI6WyJIVFRQIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBV0EsZ0JBQUosQ0FBUDtBQUNBLElBQUEsQ0FBQyxVQUFVLElBQVYsRUFBZ0I7WUFDUDtBQUNGLElBQUEsaUJBREUsTUFDRixDQUFZLElBQVosRUFBa0I7a0RBRGhCLFFBQ2dCOztBQUNkLElBQUEsaUJBQUssSUFBTCxHQUFZLElBQVosQ0FEYzthQUFsQjs7cUNBREU7O29DQUlFLElBQXNCO3dCQUFsQiwrREFBUyxLQUFLLEVBQUwsZ0JBQVM7O0FBQ3RCLElBQUEsdUJBQU8sSUFBSyxPQUFKLENBQVksS0FBWixFQUFtQixFQUFFLE1BQU0sS0FBSyxJQUFMLEVBQVcsSUFBSSxFQUFKLEVBQVEsUUFBUSxNQUFSLEVBQTlDLENBQUQsQ0FBa0UsSUFBbEUsRUFBUCxDQURzQjs7O21CQUp4QjtZQURPOztBQVNiLElBQUEsU0FBSyxNQUFMLEdBQWMsTUFBZCxDQVRhOztZQVVQO0FBQ0YsSUFBQSxpQkFERSxP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