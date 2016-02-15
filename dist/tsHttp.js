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
        var base;

        var Client = function () {
            function Client(nBase) {
                babelHelpers.classCallCheck(this, Client);

                base = nBase;
            }

            babelHelpers.createClass(Client, [{
                key: 'get',
                value: function get(ep) {
                    var params = arguments.length <= 1 || arguments[1] === undefined ? void {} : arguments[1];

                    return new Request('GET', { base: base, ep: ep, params: params }).send();
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
                if (this.url.base == void 0 && base != void 0) {
                    this.url.base = base;
                }
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

        var Pool = function () {
            function Pool(client, requests) {
                babelHelpers.classCallCheck(this, Pool);

                this.client = client;
                this.requests = requests;
            }

            babelHelpers.createClass(Pool, [{
                key: 'send',
                value: function send() {
                    return Promise.all(this.requests.map(function (v) {
                        return v.send();
                    }));
                }
            }]);
            return Pool;
        }();

        HTTP.Pool = Pool;
    })(exports.HTTP || (exports.HTTP = {}));

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNIdHRwLmpzIiwic291cmNlcyI6WyIuLi90bXAvSFRUUC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEhUVFA7XG4oZnVuY3Rpb24gKEhUVFApIHtcbiAgICB2YXIgYmFzZTtcbiAgICBjbGFzcyBDbGllbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcihuQmFzZSkge1xuICAgICAgICAgICAgYmFzZSA9IG5CYXNlO1xuICAgICAgICB9XG4gICAgICAgIGdldChlcCwgcGFyYW1zID0gdm9pZCB7fSkge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgUmVxdWVzdCgnR0VUJywgeyBiYXNlOiBiYXNlLCBlcDogZXAsIHBhcmFtczogcGFyYW1zIH0pKS5zZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSFRUUC5DbGllbnQgPSBDbGllbnQ7XG4gICAgY2xhc3MgUmVxdWVzdCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgdXJsKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmJhc2UgPT0gdm9pZCAwICYmIGJhc2UgIT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwuYmFzZSA9IGJhc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZW5QYXJhbShwYXJhbXMsIHByZWZpeCA9ICcnKSB7XG4gICAgICAgICAgICB2YXIgciA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9ICgocHJlZml4ICE9ICcnKSA/IChwcmVmaXggKyAnWycgKyBwICsgJ10nKSA6IHApLCB2ID0gcGFyYW1zW3BdO1xuICAgICAgICAgICAgICAgIGlmICghKHYgPT0gbnVsbCB8fCB0eXBlb2YgdiA9PSB2b2lkIDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHIucHVzaCgodHlwZW9mIHYgPT0gJ29iamVjdCcpID8gUmVxdWVzdC5lblBhcmFtKHYsIGspIDogZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gci5qb2luKCcmJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGJ1aWxkUXVlcnkoYmFzZSwgZXAsIHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyBlcC5yZXBsYWNlKC9eXFwvKy8sICcnKSArIChwYXJhbXMgPT0gdm9pZCB7fSA/ICcnIDogJz8nICsgUmVxdWVzdC5lblBhcmFtKHBhcmFtcykpO1xuICAgICAgICB9XG4gICAgICAgIHNlbmQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuci5vcGVuKHRoaXMubWV0aG9kLCBSZXF1ZXN0LmJ1aWxkUXVlcnkodGhpcy51cmwuYmFzZSwgdGhpcy51cmwuZXAsIHRoaXMudXJsLnBhcmFtcyksIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5zZW5kKG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yLnJlYWR5U3RhdGUgPT0gdGhpcy5yLkRPTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKHRoaXMucikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIVFRQLlJlcXVlc3QgPSBSZXF1ZXN0O1xuICAgIGNsYXNzIFJlc3BvbnNlIHtcbiAgICAgICAgY29uc3RydWN0b3Iocikge1xuICAgICAgICAgICAgdGhpcy5pc0pzb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuanNvbiA9IHZvaWQgMDtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSByLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzQ29kZSA9IHIuc3RhdHVzO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSnNvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5qc29uID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xhc3MgUG9vbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNsaWVudCwgcmVxdWVzdHMpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0cyA9IHJlcXVlc3RzO1xuICAgICAgICB9XG4gICAgICAgIHNlbmQoKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5yZXF1ZXN0cy5tYXAoKHYpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi5zZW5kKCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSFRUUC5Qb29sID0gUG9vbDtcbn0pKEhUVFAgfHwgKEhUVFAgPSB7fSkpO1xuIl0sIm5hbWVzIjpbIkhUVFAiXSwibWFwcGluZ3Mi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