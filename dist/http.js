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
                key: 'buildQuery',
                value: function buildQuery(base, ep, params) {
                    return base.replace(/\/+$/, '') + '/' + ep.replace(/^\/+/, '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZXMiOlsiLi4vdG1wL0hUVFAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBIVFRQO1xuKGZ1bmN0aW9uIChIVFRQKSB7XG4gICAgY2xhc3MgUmVxIHtcbiAgICAgICAgY29uc3RydWN0b3IoYmFzZSkge1xuICAgICAgICAgICAgdGhpcy5iYXNlID0gYmFzZTtcbiAgICAgICAgICAgIHRoaXMuciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBidWlsZFF1ZXJ5KGJhc2UsIGVwLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBiYXNlLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgZXAucmVwbGFjZSgvXlxcLysvLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0KGVwLCBwYXJhbXMgPSB2b2lkIHt9KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnIub3BlbignR0VUJywgUmVxLmJ1aWxkUXVlcnkodGhpcy5iYXNlLCBlcCwgcGFyYW1zKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLnNlbmQobnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnIucmVhZHlTdGF0ZSA9PSB0aGlzLnIuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UodGhpcy5yKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhUVFAuUmVxID0gUmVxO1xuICAgIGNsYXNzIFJlc3BvbnNlIHtcbiAgICAgICAgY29uc3RydWN0b3Iocikge1xuICAgICAgICAgICAgdGhpcy5pc0pzb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSByLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpID09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSnNvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICB9XG4gICAgICAgIGdldCBwYXlsb2FkKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNKc29uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZTtcbiAgICAgICAgfVxuICAgIH1cbn0pKEhUVFAgfHwgKEhUVFAgPSB7fSkpO1xuIl0sIm5hbWVzIjpbIkhUVFAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBV0EsZ0JBQUosQ0FBUDtBQUNBLElBQUEsQ0FBQyxVQUFVLElBQVYsRUFBZ0I7WUFDUDtBQUNGLElBQUEsaUJBREUsR0FDRixDQUFZLElBQVosRUFBa0I7a0RBRGhCLEtBQ2dCOztBQUNkLElBQUEsaUJBQUssSUFBTCxHQUFZLElBQVosQ0FEYztBQUVkLElBQUEsaUJBQUssQ0FBTCxHQUFTLElBQUksY0FBSixFQUFULENBRmM7YUFBbEI7O3FDQURFOztvQ0FRRSxJQUFzQjs7O3dCQUFsQiwrREFBUyxLQUFLLEVBQUwsZ0JBQVM7O0FBQ3RCLElBQUEsdUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQWE7QUFDNUIsSUFBQSwwQkFBSyxDQUFMLENBQU8sSUFBUCxDQUFZLEtBQVosRUFBbUIsSUFBSSxVQUFKLENBQWUsTUFBSyxJQUFMLEVBQVcsRUFBMUIsRUFBOEIsTUFBOUIsQ0FBbkIsRUFBMEQsSUFBMUQsRUFENEI7QUFFNUIsSUFBQSwwQkFBSyxDQUFMLENBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0Msa0JBQWxDLEVBRjRCO0FBRzVCLElBQUEsMEJBQUssQ0FBTCxDQUFPLElBQVAsQ0FBWSxJQUFaLEVBSDRCO0FBSTVCLElBQUEsMEJBQUssQ0FBTCxDQUFPLGdCQUFQLENBQXdCLGtCQUF4QixFQUE0QyxZQUFNO0FBQzlDLElBQUEsNEJBQUksTUFBSyxDQUFMLENBQU8sVUFBUCxJQUFxQixNQUFLLENBQUwsQ0FBTyxJQUFQLEVBQWE7QUFDbEMsSUFBQSxvQ0FBUSxJQUFJLFFBQUosQ0FBYSxNQUFLLENBQUwsQ0FBckIsRUFEa0M7NkJBQXRDO3lCQUR3QyxDQUE1QyxDQUo0QjtxQkFBYixDQUFuQixDQURzQjs7OzsyQ0FIUixNQUFNLElBQUksUUFBUTtBQUNoQyxJQUFBLHVCQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBcUIsRUFBckIsSUFBMkIsR0FBM0IsR0FBaUMsR0FBRyxPQUFILENBQVcsTUFBWCxFQUFtQixFQUFuQixDQUFqQyxDQUR5Qjs7O21CQUxsQztZQURPOztBQXNCYixJQUFBLFNBQUssR0FBTCxHQUFXLEdBQVgsQ0F0QmE7O1lBdUJQO0FBQ0YsSUFBQSxpQkFERSxRQUNGLENBQVksQ0FBWixFQUFlO2tEQURiLFVBQ2E7O0FBQ1gsSUFBQSxpQkFBSyxNQUFMLEdBQWMsS0FBZCxDQURXO0FBRVgsSUFBQSxpQkFBSyxRQUFMLEdBQWdCLEVBQUUsWUFBRixDQUZMO0FBR1gsSUFBQSxnQkFBSTtBQUNBLElBQUEsb0JBQUksRUFBRSxpQkFBRixDQUFvQixjQUFwQixLQUF1QyxrQkFBdkMsRUFBMkQ7QUFDM0QsSUFBQSx5QkFBSyxNQUFMLEdBQWMsSUFBZCxDQUQyRDtxQkFBL0Q7aUJBREosQ0FLQSxPQUFPLENBQVAsRUFBVSxFQUFWO2FBUko7O3FDQURFOztvQ0FXWTtBQUNWLElBQUEsb0JBQUksS0FBSyxNQUFMLEVBQWE7QUFDYixJQUFBLDJCQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssUUFBTCxDQUFsQixDQURhO3FCQUFqQjtBQUdBLElBQUEsdUJBQU8sS0FBSyxRQUFMLENBSkc7OzttQkFYWjtZQXZCTztLQUFoQixDQUFELENBeUNHQSxpQkFBU0EsZUFBTyxFQUFQLENBQVQsQ0F6Q0g7OyJ9