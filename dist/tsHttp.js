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
        var base, _config;
        HTTP.GET = 'GET';

        var Client = function () {
            function Client(nBase, config) {
                babelHelpers.classCallCheck(this, Client);

                base = nBase;
                _config = config;
            }

            babelHelpers.createClass(Client, [{
                key: 'get',
                value: function get(ep) {
                    var params = arguments.length <= 1 || arguments[1] === undefined ? void {} : arguments[1];

                    return new Request(HTTP.GET, { base: base, ep: ep, params: params }).send();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNIdHRwLmpzIiwic291cmNlcyI6WyIuLi90bXAvSFRUUC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEhUVFA7XG4oZnVuY3Rpb24gKEhUVFApIHtcbiAgICB2YXIgYmFzZSwgX2NvbmZpZztcbiAgICBIVFRQLkdFVCA9ICdHRVQnO1xuICAgIGNsYXNzIENsaWVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG5CYXNlLCBjb25maWcpIHtcbiAgICAgICAgICAgIGJhc2UgPSBuQmFzZTtcbiAgICAgICAgICAgIF9jb25maWcgPSBjb25maWc7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0KGVwLCBwYXJhbXMgPSB2b2lkIHt9KSB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBSZXF1ZXN0KEhUVFAuR0VULCB7IGJhc2U6IGJhc2UsIGVwOiBlcCwgcGFyYW1zOiBwYXJhbXMgfSkpLnNlbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIVFRQLkNsaWVudCA9IENsaWVudDtcbiAgICBjbGFzcyBSZXF1ZXN0IHtcbiAgICAgICAgY29uc3RydWN0b3IobWV0aG9kLCB1cmwpIHtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwuYmFzZSA9PSB2b2lkIDAgJiYgYmFzZSAhPSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVybC5iYXNlID0gYmFzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBlblBhcmFtKHBhcmFtcywgcHJlZml4ID0gJycpIHtcbiAgICAgICAgICAgIHZhciByID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgIHZhciBrID0gKChwcmVmaXggIT0gJycpID8gKHByZWZpeCArICdbJyArIHAgKyAnXScpIDogcCksIHYgPSBwYXJhbXNbcF07XG4gICAgICAgICAgICAgICAgaWYgKCEodiA9PSBudWxsIHx8IHR5cGVvZiB2ID09IHZvaWQgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKCh0eXBlb2YgdiA9PSAnb2JqZWN0JykgPyBSZXF1ZXN0LmVuUGFyYW0odiwgaykgOiBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByLmpvaW4oJyYnKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgYnVpbGRRdWVyeShiYXNlLCBlcCwgcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gYmFzZS5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIGVwLnJlcGxhY2UoL15cXC8rLywgJycpICsgKHBhcmFtcyA9PSB2b2lkIHt9ID8gJycgOiAnPycgKyBSZXF1ZXN0LmVuUGFyYW0ocGFyYW1zKSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VuZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yLm9wZW4odGhpcy5tZXRob2QsIFJlcXVlc3QuYnVpbGRRdWVyeSh0aGlzLnVybC5iYXNlLCB0aGlzLnVybC5lcCwgdGhpcy51cmwucGFyYW1zKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLnNlbmQobnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnIucmVhZHlTdGF0ZSA9PSB0aGlzLnIuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UodGhpcy5yKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhUVFAuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gICAgY2xhc3MgUmVzcG9uc2Uge1xuICAgICAgICBjb25zdHJ1Y3RvcihyKSB7XG4gICAgICAgICAgICB0aGlzLmlzSnNvbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5qc29uID0gdm9pZCAwO1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgdGhpcy5zdGF0dXNDb2RlID0gci5zdGF0dXM7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNKc29uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmpzb24gPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGFzcyBQb29sIHtcbiAgICAgICAgY29uc3RydWN0b3IoY2xpZW50LCByZXF1ZXN0cykge1xuICAgICAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RzID0gcmVxdWVzdHM7XG4gICAgICAgIH1cbiAgICAgICAgc2VuZChjYikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlcXVlc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0c1tpXS5zZW5kKCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2IocmVzcG9uc2UsIGkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIEhUVFAuUG9vbCA9IFBvb2w7XG59KShIVFRQIHx8IChIVFRQID0ge30pKTtcbiJdLCJuYW1lcyI6WyJIVFRQIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBV0EsZ0JBQUosQ0FBUDtBQUNBLElBQUEsQ0FBQyxVQUFVLElBQVYsRUFBZ0I7QUFDYixJQUFBLFFBQUksSUFBSixFQUFVLE9BQVYsQ0FEYTtBQUViLElBQUEsU0FBSyxHQUFMLEdBQVcsS0FBWCxDQUZhOztZQUdQO0FBQ0YsSUFBQSxpQkFERSxNQUNGLENBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjtrREFEekIsUUFDeUI7O0FBQ3ZCLElBQUEsbUJBQU8sS0FBUCxDQUR1QjtBQUV2QixJQUFBLHNCQUFVLE1BQVYsQ0FGdUI7YUFBM0I7O3FDQURFOztvQ0FLRSxJQUFzQjt3QkFBbEIsK0RBQVMsS0FBSyxFQUFMLGdCQUFTOztBQUN0QixJQUFBLHVCQUFPLElBQUssT0FBSixDQUFZLEtBQUssR0FBTCxFQUFVLEVBQUUsTUFBTSxJQUFOLEVBQVksSUFBSSxFQUFKLEVBQVEsUUFBUSxNQUFSLEVBQTVDLENBQUQsQ0FBZ0UsSUFBaEUsRUFBUCxDQURzQjs7O21CQUx4QjtZQUhPOztBQVliLElBQUEsU0FBSyxNQUFMLEdBQWMsTUFBZCxDQVphOztZQWFQO0FBQ0YsSUFBQSxpQkFERSxPQUNGLENBQVksTUFBWixFQUFvQixHQUFwQixFQUF5QjtrREFEdkIsU0FDdUI7O0FBQ3JCLElBQUEsaUJBQUssTUFBTCxHQUFjLE1BQWQsQ0FEcUI7QUFFckIsSUFBQSxpQkFBSyxHQUFMLEdBQVcsR0FBWCxDQUZxQjtBQUdyQixJQUFBLGdCQUFJLEtBQUssR0FBTCxDQUFTLElBQVQsSUFBaUIsS0FBSyxDQUFMLElBQVUsUUFBUSxLQUFLLENBQUwsRUFB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