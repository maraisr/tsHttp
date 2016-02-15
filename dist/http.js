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

                    var params = arguments.length <= 1 || arguments[1] === undefined ? void {} : arguments[1];

                    return new Promise(function (resolve) {
                        _this.r.open('GET', Req.buildQuery(_this.base, ep, params), true);
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
                            r.push((typeof v === 'undefined' ? 'undefined' : babelHelpers.typeof(v)) == 'object' ? Req.enParam(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
                        }
                    }
                    return r.join('&');
                }
            }, {
                key: 'buildQuery',
                value: function buildQuery(base, ep, params) {
                    return base.replace(/\/+$/, '') + '/' + ep.replace(/^\/+/, '') + (params == void {} ? '' : '?' + Req.enParam(params));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL0hUVFAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBIVFRQO1xuKGZ1bmN0aW9uIChIVFRQKSB7XG4gICAgY2xhc3MgUmVxIHtcbiAgICAgICAgY29uc3RydWN0b3IoYmFzZSkge1xuICAgICAgICAgICAgdGhpcy5iYXNlID0gYmFzZTtcbiAgICAgICAgICAgIHRoaXMuciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBlblBhcmFtKHBhcmFtcywgcHJlZml4ID0gJycpIHtcbiAgICAgICAgICAgIHZhciByID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgIHZhciBrID0gKChwcmVmaXggIT0gJycpID8gKHByZWZpeCArICdbJyArIHAgKyAnXScpIDogcCksIHYgPSBwYXJhbXNbcF07XG4gICAgICAgICAgICAgICAgaWYgKCEodiA9PSBudWxsIHx8IHR5cGVvZiB2ID09IHZvaWQgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKCh0eXBlb2YgdiA9PSAnb2JqZWN0JykgPyBSZXEuZW5QYXJhbSh2LCBrKSA6IGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHIuam9pbignJicpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBidWlsZFF1ZXJ5KGJhc2UsIGVwLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBiYXNlLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgZXAucmVwbGFjZSgvXlxcLysvLCAnJykgKyAocGFyYW1zID09IHZvaWQge30gPyAnJyA6ICc/JyArIFJlcS5lblBhcmFtKHBhcmFtcykpO1xuICAgICAgICB9XG4gICAgICAgIGdldChlcCwgcGFyYW1zID0gdm9pZCB7fSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yLm9wZW4oJ0dFVCcsIFJlcS5idWlsZFF1ZXJ5KHRoaXMuYmFzZSwgZXAsIHBhcmFtcyksIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5zZW5kKG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yLnJlYWR5U3RhdGUgPT0gdGhpcy5yLkRPTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKHRoaXMucikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIVFRQLlJlcSA9IFJlcTtcbiAgICBjbGFzcyBSZXNwb25zZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHIpIHtcbiAgICAgICAgICAgIHRoaXMuaXNKc29uID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlID0gci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSA9PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0pzb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgfVxuICAgICAgICBnZXQgcGF5bG9hZCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSnNvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICB9XG59KShIVFRQIHx8IChIVFRQID0ge30pKTtcbiJdLCJuYW1lcyI6WyJIVFRQIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBV0EsZ0JBQUosQ0FBUDtBQUNBLElBQUEsQ0FBQyxVQUFVLElBQVYsRUFBZ0I7WUFDUDtBQUNGLElBQUEsaUJBREUsR0FDRixDQUFZLElBQVosRUFBa0I7a0RBRGhCLEtBQ2dCOztBQUNkLElBQUEsaUJBQUssSUFBTCxHQUFZLElBQVosQ0FEYztBQUVkLElBQUEsaUJBQUssQ0FBTCxHQUFTLElBQUksY0FBSixFQUFULENBRmM7YUFBbEI7O3FDQURFOztvQ0FrQkUsSUFBc0I7Ozt3QkFBbEIsK0RBQVMsS0FBSyxFQUFMLGdCQUFTOztBQUN0QixJQUFBLHVCQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFhO0FBQzVCLElBQUEsMEJBQUssQ0FBTCxDQUFPLElBQVAsQ0FBWSxLQUFaLEVBQW1CLElBQUksVUFBSixDQUFlLE1BQUssSUFBTCxFQUFXLEVBQTFCLEVBQThCLE1BQTlCLENBQW5CLEVBQTBELElBQTFELEVBRDRCO0FBRTVCLElBQUEsMEJBQUssQ0FBTCxDQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLGtCQUFsQyxFQUY0QjtBQUc1QixJQUFBLDBCQUFLLENBQUwsQ0FBTyxJQUFQLENBQVksSUFBWixFQUg0QjtBQUk1QixJQUFBLDBCQUFLLENBQUwsQ0FBTyxnQkFBUCxDQUF3QixrQkFBeEIsRUFBNEMsWUFBTTtBQUM5QyxJQUFBLDRCQUFJLE1BQUssQ0FBTCxDQUFPLFVBQVAsSUFBcUIsTUFBSyxDQUFMLENBQU8sSUFBUCxFQUFhO0FBQ2xDLElBQUEsb0NBQVEsSUFBSSxRQUFKLENBQWEsTUFBSyxDQUFMLENBQXJCLEVBRGtDOzZCQUF0Qzt5QkFEd0MsQ0FBNUMsQ0FKNEI7cUJBQWIsQ0FBbkIsQ0FEc0I7Ozs7d0NBYlgsUUFBcUI7d0JBQWIsK0RBQVMsa0JBQUk7O0FBQ2hDLElBQUEsb0JBQUksSUFBSSxJQUFJLEtBQUosRUFBSixDQUQ0QjtBQUVoQyxJQUFBLHFCQUFLLElBQUksQ0FBSixJQUFTLE1BQWQsRUFBc0I7QUFDbEIsSUFBQSx3QkFBSSxJQUFLLE1BQUMsSUFBVSxFQUFWLEdBQWlCLFNBQVMsR0FBVCxHQUFlLENBQWYsR0FBbUIsR0FBbkIsR0FBMEIsQ0FBNUM7NEJBQWdELElBQUksT0FBTyxDQUFQLENBQUosQ0FEdkM7QUFFbEIsSUFBQSx3QkFBSSxFQUFFLEtBQUssSUFBTCxJQUFhLFFBQU8seURBQVAsSUFBWSxLQUFLLENBQUwsQ0FBM0IsRUFBb0M7QUFDcEMsSUFBQSwwQkFBRSxJQUFGLENBQU8sUUFBUSx5REFBUCxJQUFZLFFBQVosR0FBd0IsSUFBSSxPQUFKLENBQVksQ0FBWixFQUFlLENBQWYsQ0FBekIsR0FBNkMsbUJBQW1CLENBQW5CLElBQXdCLEdBQXhCLEdBQThCLG1CQUFtQixDQUFuQixDQUE5QixDQUFwRCxDQURvQzt5QkFBeEM7cUJBRko7QUFNQSxJQUFBLHVCQUFPLEVBQUUsSUFBRixDQUFPLEdBQVAsQ0FBUCxDQVJnQzs7OzsyQ0FVbEIsTUFBTSxJQUFJLFFBQVE7QUFDaEMsSUFBQSx1QkFBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQXFCLEVBQXJCLElBQTJCLEdBQTNCLEdBQWlDLEdBQUcsT0FBSCxDQUFXLE1BQVgsRUFBbUIsRUFBbkIsQ0FBakMsSUFBMkQsVUFBVSxLQUFLLEVBQUwsR0FBVSxFQUFwQixHQUF5QixNQUFNLElBQUksT0FBSixDQUFZLE1BQVosQ0FBTixDQUFwRixDQUR5Qjs7O21CQWZsQztZQURPOztBQWdDYixJQUFBLFNBQUssR0FBTCxHQUFXLEdBQVgsQ0FoQ2E7O1lBaUNQO0FBQ0YsSUFBQSxpQkFERSxRQUNGLENBQVksQ0FBWixFQUFlO2tEQURiLFVBQ2E7O0FBQ1gsSUFBQSxpQkFBSyxNQUFMLEdBQWMsS0FBZCxDQURXO0FBRVgsSUFBQSxpQkFBSyxRQUFMLEdBQWdCLEVBQUUsWUFBRixDQUZMO0FBR1gsSUFBQSxnQkFBSTtBQUNBLElBQUEsb0JBQUksRUFBRSxpQkFBRixDQUFvQixjQUFwQixLQUF1QyxrQkFBdkMsRUFBMkQ7QUFDM0QsSUFBQSx5QkFBSyxNQUFMLEdBQWMsSUFBZCxDQUQyRDtxQkFBL0Q7aUJBREosQ0FLQSxPQUFPLENBQVAsRUFBVSxFQUFWO2FBUko7O3FDQURFOztvQ0FXWTtBQUNWLElBQUEsb0JBQUksS0FBSyxNQUFMLEVBQWE7QUFDYixJQUFBLDJCQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssUUFBTCxDQUFsQixDQURhO3FCQUFqQjtBQUdBLElBQUEsdUJBQU8sS0FBSyxRQUFMLENBSkc7OzttQkFYWjtZQWpDTztLQUFoQixDQUFELENBbURHQSxpQkFBU0EsZUFBTyxFQUFQLENBQVQsQ0FuREg7OyJ9