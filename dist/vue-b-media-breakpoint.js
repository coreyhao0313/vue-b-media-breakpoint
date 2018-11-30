'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mediaQueries = require('media-queries');

var _mediaQueries2 = _interopRequireDefault(_mediaQueries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue, options) {

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {

      Vue.mixin({
        data: function data() {
          return {
            size: {
              up: {
                sm: false,
                md: false,
                lg: false,
                xl: false
              },
              only: {
                xs: false,
                sm: false,
                md: false,
                lg: false,
                xl: false
              },
              down: {
                xs: false,
                sm: false,
                md: false,
                lg: false
              }
            }
          };
        },
        created: function created() {
          Vue.prototype.$mediaBreakpoint = this.size;
          Vue.prototype.$mediaBreakpoint.between = this.getSizeBetween;

          Vue.prototype.$Bmb = Vue.prototype.$mediaBreakpoint;
          Vue.prototype.$Bmb.between = Vue.prototype.$mediaBreakpoint.between;

          this.setMediaBreakpointUpEvent(new _mediaQueries2.default()).getStatus(function (status, context) {
            context.trigger(status.querystrings);
          });

          this.setMediaBreakpointOnlyEvent(new _mediaQueries2.default()).getStatus(function (status, context) {
            context.trigger(status.querystrings);
          });

          this.setMediaBreakpointDownEvent(new _mediaQueries2.default()).getStatus(function (status, context) {
            context.trigger(status.querystrings);
          });
        },

        methods: {
          setMediaBreakpointUpEvent: function setMediaBreakpointUpEvent(media) {
            var self = this;

            return media.set('(min-width: 576px)', function (event) {
              self.size.up.sm = event.matches;
            }, true).set('(min-width: 768px)', function (event) {
              self.size.up.md = event.matches;
            }, true).set('(min-width: 992px)', function (event) {
              self.size.up.lg = event.matches;
            }, true).set('(min-width: 1200px)', function (event) {
              self.size.up.xl = event.matches;
              self.size.only.xl = event.matches;
            }, true);
          },
          setMediaBreakpointOnlyEvent: function setMediaBreakpointOnlyEvent(media) {
            var self = this;

            return media.set('(max-width: 575.98px)', function (event) {
              self.size.only.xs = event.matches;
              self.size.down.xs = event.matches;
            }, true).set('(min-width: 576px) and (max-width: 767.98px)', function (event) {
              self.size.only.sm = event.matches;
            }, true).set('(min-width: 768px) and (max-width: 991.98px)', function (event) {
              self.size.only.md = event.matches;
            }, true).set('(min-width: 992px) and (max-width: 1199.98px)', function (event) {
              self.size.only.lg = event.matches;
            }, true);
          },
          setMediaBreakpointDownEvent: function setMediaBreakpointDownEvent(media) {
            var self = this;

            return media.set('(max-width: 767.98px)', function (event) {
              self.size.down.sm = event.matches;
            }, true).set('(max-width: 991.98px)', function (event) {
              self.size.down.md = event.matches;
            }, true).set('(max-width: 1199.98px)', function (event) {
              self.size.down.lg = event.matches;
            }, true);
          },
          getSizeBetween: function getSizeBetween(lower, upper) {

            if (lower in this.size.up && upper in this.size.down) {

              return this.size.up[lower] && this.size.down[upper];
            } else {

              if (lower in this.size.up) {
                return this.size.up[lower];
              }
              if (upper in this.size.down) {
                return this.size.down[upper];
              }
            }

            return false;
          }
        }
      });
    } else {
      Vue.prototype.$mediaBreakpoint = {
        up: {
          sm: false,
          md: false,
          lg: false,
          xl: false
        },
        only: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: false
        },
        down: {
          xs: false,
          sm: false,
          md: false,
          lg: false
        },
        between: new Function()
      };

      Vue.prototype.$Bmb = Vue.prototype.$mediaBreakpoint;
    }
  }
};