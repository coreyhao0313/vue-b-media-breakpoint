'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaQueries = require('media-queries');

var _mediaQueries2 = _interopRequireDefault(_mediaQueries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var size = {
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
};

var setMediaBreakpointUpEvent = function setMediaBreakpointUpEvent(media) {
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
};

var setMediaBreakpointOnlyEvent = function setMediaBreakpointOnlyEvent(media) {
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
};

var setMediaBreakpointDownEvent = function setMediaBreakpointDownEvent(media) {
  var self = this;

  return media.set('(max-width: 767.98px)', function (event) {
    self.size.down.sm = event.matches;
  }, true).set('(max-width: 991.98px)', function (event) {
    self.size.down.md = event.matches;
  }, true).set('(max-width: 1199.98px)', function (event) {
    self.size.down.lg = event.matches;
  }, true);
};

var getSizeBetween = function getSizeBetween(lower, upper) {

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
};

exports.default = {
  install: function install(Vue) {
    var vm = new Vue({
      data: function data() {
        return { size: size };
      },

      methods: {
        setMediaBreakpointUpEvent: setMediaBreakpointUpEvent,
        setMediaBreakpointOnlyEvent: setMediaBreakpointOnlyEvent,
        setMediaBreakpointDownEvent: setMediaBreakpointDownEvent,
        getSizeBetween: getSizeBetween
      }
    });

    Vue.prototype.$mediaBreakpoint = vm.size;
    Vue.prototype.$mediaBreakpoint.between = vm.getSizeBetween;

    Vue.prototype.$Bmb = Vue.prototype.$mediaBreakpoint;
    Vue.prototype.$Bmb.between = Vue.prototype.$mediaBreakpoint.between;

    if (typeof window === 'undefined') {
      return;
    }

    vm.setMediaBreakpointUpEvent(new _mediaQueries2.default()).getStatus(function (status, context) {
      context.trigger(status.querystrings);
    });

    vm.setMediaBreakpointOnlyEvent(new _mediaQueries2.default()).getStatus(function (status, context) {
      context.trigger(status.querystrings);
    });

    vm.setMediaBreakpointDownEvent(new _mediaQueries2.default()).getStatus(function (status, context) {
      context.trigger(status.querystrings);
    });
  }
};