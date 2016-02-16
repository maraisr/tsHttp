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
                value: function send(cb) {
                    var _this2 = this;

                    var _loop = function _loop(i) {
                        _this2.requests[i].send().then(function (response) {
                            cb(response, i);
                        });
                    };

                    for (var i = 0; i < this.requests.length; i++) {
                        _loop(i);
                    }
                }
            }]);
            return Pool;
        }();

        HTTP.Pool = Pool;
    })(exports.HTTP || (exports.HTTP = {}));

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNIdHRwLmpzIiwic291cmNlcyI6WyIuLi90bXAvSFRUUC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEhUVFA7XG4oZnVuY3Rpb24gKEhUVFApIHtcbiAgICB2YXIgYmFzZTtcbiAgICBjbGFzcyBDbGllbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcihuQmFzZSkge1xuICAgICAgICAgICAgYmFzZSA9IG5CYXNlO1xuICAgICAgICB9XG4gICAgICAgIGdldChlcCwgcGFyYW1zID0gdm9pZCB7fSkge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgUmVxdWVzdCgnR0VUJywgeyBiYXNlOiBiYXNlLCBlcDogZXAsIHBhcmFtczogcGFyYW1zIH0pKS5zZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSFRUUC5DbGllbnQgPSBDbGllbnQ7XG4gICAgY2xhc3MgUmVxdWVzdCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgdXJsKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmJhc2UgPT0gdm9pZCAwICYmIGJhc2UgIT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwuYmFzZSA9IGJhc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZW5QYXJhbShwYXJhbXMsIHByZWZpeCA9ICcnKSB7XG4gICAgICAgICAgICB2YXIgciA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9ICgocHJlZml4ICE9ICcnKSA/IChwcmVmaXggKyAnWycgKyBwICsgJ10nKSA6IHApLCB2ID0gcGFyYW1zW3BdO1xuICAgICAgICAgICAgICAgIGlmICghKHYgPT0gbnVsbCB8fCB0eXBlb2YgdiA9PSB2b2lkIDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHIucHVzaCgodHlwZW9mIHYgPT0gJ29iamVjdCcpID8gUmVxdWVzdC5lblBhcmFtKHYsIGspIDogZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gci5qb2luKCcmJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGJ1aWxkUXVlcnkoYmFzZSwgZXAsIHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyBlcC5yZXBsYWNlKC9eXFwvKy8sICcnKSArIChwYXJhbXMgPT0gdm9pZCB7fSA/ICcnIDogJz8nICsgUmVxdWVzdC5lblBhcmFtKHBhcmFtcykpO1xuICAgICAgICB9XG4gICAgICAgIHNlbmQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuci5vcGVuKHRoaXMubWV0aG9kLCBSZXF1ZXN0LmJ1aWxkUXVlcnkodGhpcy51cmwuYmFzZSwgdGhpcy51cmwuZXAsIHRoaXMudXJsLnBhcmFtcyksIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5zZW5kKG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yLnJlYWR5U3RhdGUgPT0gdGhpcy5yLkRPTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKHRoaXMucikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIVFRQLlJlcXVlc3QgPSBSZXF1ZXN0O1xuICAgIGNsYXNzIFJlc3BvbnNlIHtcbiAgICAgICAgY29uc3RydWN0b3Iocikge1xuICAgICAgICAgICAgdGhpcy5pc0pzb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuanNvbiA9IHZvaWQgMDtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSByLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzQ29kZSA9IHIuc3RhdHVzO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSnNvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5qc29uID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xhc3MgUG9vbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNsaWVudCwgcmVxdWVzdHMpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0cyA9IHJlcXVlc3RzO1xuICAgICAgICB9XG4gICAgICAgIHNlbmQoY2IpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZXF1ZXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdHNbaV0uc2VuZCgpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3BvbnNlLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBIVFRQLlBvb2wgPSBQb29sO1xufSkoSFRUUCB8fCAoSFRUUCA9IHt9KSk7XG4iXSwibmFtZXMiOlsiSFRUUCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVdBLGdCQUFKLENBQVA7QUFDQSxJQUFBLENBQUMsVUFBVSxJQUFWLEVBQWdCO0FBQ2IsSUFBQSxRQUFJLElBQUosQ0FEYTs7WUFFUDtBQUNGLElBQUEsaUJBREUsTUFDRixDQUFZLEtBQVosRUFBbUI7a0RBRGpCLFFBQ2lCOztBQUNmLElBQUEsbUJBQU8sS0FBUCxDQURlO2FBQW5COztxQ0FERTs7b0NBSUUsSUFBc0I7d0JBQWxCLCtEQUFTLEtBQUssRUFBTCxnQkFBUzs7QUFDdEIsSUFBQSx1QkFBTyxJQUFLLE9BQUosQ0FBWSxLQUFaLEVBQW1CLEVBQUUsTUFBTSxJQUFOLEVBQVksSUFBSSxFQUFKLEVBQVEsUUFBUSxNQUFSLEVBQXpDLENBQUQsQ0FBNkQsSUFBN0QsRUFBUCxDQURzQjs7O21CQUp4QjtZQUZPOztBQVViLElBQUEsU0FBSyxNQUFMLEdBQWMsTUFBZCxDQVZhOztZQVdQO0FBQ0YsSUFBQSxpQkFERSxPQUNGLENBQVksTUFBWixFQUFvQixHQUFwQixFQUF5QjtrREFEdkIsU0FDdUI7O0FBQ3JCLElBQUEsaUJBQUssTUFBTCxHQUFjLE1BQWQsQ0FEcUI7QUFFckIsSUFBQSxpQkFBSyxHQUFMLEdBQVcsR0FBWCxDQUZxQjtBQUdyQixJQUFBLGdCQUFJLEtBQUssR0FBTCxDQUFTLElBQVQsSUFBaUIsS0FBSyxDQUFMLElBQVUsUUFBUSxLQUFLLENBQUwsRUFBUTtBQUMzQyxJQUFBLHFCQUFLLEdBQUwsQ0FBUyxJQUFULEdBQWdCLElBQWhCLENBRDJDO2lCQUEvQztBQUdBLElBQUEsaUJBQUssQ0FBTCxHQUFTLElBQUksY0FBSixFQUFULENBTnFCO2FBQXpCOztxQ0FERTs7dUNBc0JLOzs7QUFDSCxJQUFBLHVCQUFPLElBQUksT0FBSixDQUFZLFVBQUMs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