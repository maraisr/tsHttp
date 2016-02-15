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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNIdHRwLmpzIiwic291cmNlcyI6WyIuLi90bXAvSFRUUC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEhUVFA7XG4oZnVuY3Rpb24gKEhUVFApIHtcbiAgICBjbGFzcyBSZXEge1xuICAgICAgICBjb25zdHJ1Y3RvcihiYXNlKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2UgPSBiYXNlO1xuICAgICAgICAgICAgdGhpcy5yID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGVuUGFyYW0ocGFyYW1zLCBwcmVmaXggPSAnJykge1xuICAgICAgICAgICAgdmFyIHIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGsgPSAoKHByZWZpeCAhPSAnJykgPyAocHJlZml4ICsgJ1snICsgcCArICddJykgOiBwKSwgdiA9IHBhcmFtc1twXTtcbiAgICAgICAgICAgICAgICBpZiAoISh2ID09IG51bGwgfHwgdHlwZW9mIHYgPT0gdm9pZCAwKSkge1xuICAgICAgICAgICAgICAgICAgICByLnB1c2goKHR5cGVvZiB2ID09ICdvYmplY3QnKSA/IFJlcS5lblBhcmFtKHYsIGspIDogZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gci5qb2luKCcmJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGJ1aWxkUXVlcnkoYmFzZSwgZXAsIHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyBlcC5yZXBsYWNlKC9eXFwvKy8sICcnKSArIChwYXJhbXMgPT0gdm9pZCB7fSA/ICcnIDogJz8nICsgUmVxLmVuUGFyYW0ocGFyYW1zKSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0KGVwLCBwYXJhbXMgPSB2b2lkIHt9KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnIub3BlbignR0VUJywgUmVxLmJ1aWxkUXVlcnkodGhpcy5iYXNlLCBlcCwgcGFyYW1zKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLnNlbmQobnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnIucmVhZHlTdGF0ZSA9PSB0aGlzLnIuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UodGhpcy5yKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhUVFAuUmVxID0gUmVxO1xuICAgIGNsYXNzIFJlc3BvbnNlIHtcbiAgICAgICAgY29uc3RydWN0b3Iocikge1xuICAgICAgICAgICAgdGhpcy5pc0pzb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSByLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpID09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSnNvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICB9XG4gICAgICAgIGdldCBwYXlsb2FkKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNKc29uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZTtcbiAgICAgICAgfVxuICAgIH1cbn0pKEhUVFAgfHwgKEhUVFAgPSB7fSkpO1xuIl0sIm5hbWVzIjpbIkhUVFAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFXQSxnQkFBSixDQUFQO0FBQ0EsSUFBQSxDQUFDLFVBQVUsSUFBVixFQUFnQjtZQUNQO0FBQ0YsSUFBQSxpQkFERSxHQUNGLENBQVksSUFBWixFQUFrQjtrREFEaEIsS0FDZ0I7O0FBQ2QsSUFBQSxpQkFBSyxJQUFMLEdBQVksSUFBWixDQURjO0FBRWQsSUFBQSxpQkFBSyxDQUFMLEdBQVMsSUFBSSxjQUFKLEVBQVQsQ0FGYzthQUFsQjs7cUNBREU7O29DQWtCRSxJQUFzQjs7O3dCQUFsQiwrREFBUyxLQUFLLEVBQUwsZ0JBQVM7O0FBQ3RCLElBQUEsdUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQWE7QUFDNUIsSUFBQSwwQkFBSyxDQUFMLENBQU8sSUFBUCxDQUFZLEtBQVosRUFBbUIsSUFBSSxVQUFKLENBQWUsTUFBSyxJQUFMLEVBQVcsRUFBMUIsRUFBOEIsTUFBOUIsQ0FBbkIsRUFBMEQsSUFBMUQsRUFENEI7QUFFNUIsSUFBQSwwQkFBSyxDQUFMLENBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0Msa0JBQWxDLEVBRjRCO0FBRzVCLElBQUEsMEJBQUssQ0FBTCxDQUFPLElBQVAsQ0FBWSxJQUFaLEVBSDRCO0FBSTVCLElBQUEsMEJBQUssQ0FBTCxDQUFPLGdCQUFQLENBQXdCLGtCQUF4QixFQUE0QyxZQUFNO0FBQzlDLElBQUEsNEJBQUksTUFBSyxDQUFMLENBQU8sVUFBUCxJQUFxQixNQUFLLENBQUwsQ0FBTyxJQUFQLEVBQWE7QUFDbEMsSUFBQSxvQ0FBUSxJQUFJLFFBQUosQ0FBYSxNQUFLLENBQUwsQ0FBckIsRUFEa0M7NkJBQXRDO3lCQUR3QyxDQUE1QyxDQUo0QjtxQkFBYixDQUFuQixDQURzQjs7Ozt3Q0FiWCxRQUFxQjt3QkFBYiwrREFBUyxrQkFBSTs7QUFDaEMsSUFBQSxvQkFBSSxJQUFJLElBQUksS0FBSixFQUFKLENBRDRCO0FBRWhDLElBQUEscUJBQUssSUFBSSxDQUFKLElBQVMsTUFBZCxFQUFzQjtBQUNsQixJQUFBLHdCQUFJLElBQUssTUFBQyxJQUFVLEVBQVYsR0FBaUIsU0FBUyxHQUFULEdBQWUsQ0FBZixHQUFtQixHQUFuQixHQUEwQixDQUE1Qzs0QkFBZ0QsSUFBSSxPQUFPLENBQVAsQ0FBSixDQUR2QztBQUVsQixJQUFBLHdCQUFJLEVBQUUsS0FBSyxJQUFMLElBQWEsUUFBTyx5REFBUCxJQUFZLEtBQUssQ0FBTCxDQUEzQixFQUFvQztBQUNwQyxJQUFBLDBCQUFFLElBQUYsQ0FBTyxRQUFRLHlEQUFQLElBQVksUUFBWixHQUF3QixJQUFJLE9BQUosQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUF6QixHQUE2QyxtQkFBbUIsQ0FBbkIsSUFBd0IsR0FBeEIsR0FBOEIsbUJBQW1CLENBQW5CLENBQTlCLENBQXBELENBRG9DO3lCQUF4QztxQkFGSjtBQU1BLElBQUEsdUJBQU8sRUFBRSxJQUFGLENBQU8sR0FBUCxDQUFQLENBUmdDOzs7OzJDQVVsQixNQUFNLElBQUksUUFBUTtBQUNoQyxJQUFBLHVCQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBcUIsRUFBckIsSUFBMkIsR0FBM0IsR0FBaUMsR0FBRyxPQUFILENBQVcsTUFBWCxFQUFtQixFQUFuQixDQUFqQyxJQUEyRCxVQUFVLEtBQUssRUFBTCxHQUFVLEVBQXBCLEdBQXlCLE1BQU0sSUFBSSxPQUFKLENBQVksTUFBWixDQUFOLENBQXBGLENBRHlCOzs7bUJBZmxDO1lBRE87O0FBZ0NiLElBQUEsU0FBSyxHQUFMLEdBQVcsR0FBWCxDQWhDYTs7WUFpQ1A7QUFDRixJQUFBLGlCQURFLFFBQ0YsQ0FBWSxDQUFaLEVBQWU7a0RBRGIsVUFDYTs7QUFDWCxJQUFBLGlCQUFLLE1BQUwsR0FBYyxLQUFkLENBRFc7QUFFWCxJQUFBLGlCQUFLLFFBQUwsR0FBZ0IsRUFBRSxZQUFGLENBRkw7QUFHWCxJQUFBLGdCQUFJO0FBQ0EsSUFBQSxvQkFBSSxFQUFFLGlCQUFGLENBQW9CLGNBQXBCLEtBQXVDLGtCQUF2QyxFQUEyRDtBQUMzRCxJQUFBLHlCQUFLLE1BQUwsR0FBYyxJQUFkLENBRDJEO3FCQUEvRDtpQkFESixDQUtBLE9BQU8sQ0FBUCxFQUFVLEVBQVY7YUFSSjs7cUNBREU7O29DQVdZO0FBQ1YsSUFBQSxvQkFBSSxLQUFLLE1BQUwsRUFBYTtBQUNiLElBQUEsMkJBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxRQUFMLENBQWxCLENBRGE7cUJBQWpCO0FBR0EsSUFBQSx1QkFBTyxLQUFLLFFBQUwsQ0FKRzs7O21CQVhaO1lBakNPO0tBQWhCLENBQUQsQ0FtREdBLGlCQUFTQSxlQUFPLEVBQVAsQ0FBVCxDQW5ESDs7In0=