import media from 'media-queries';

const size = {
  up  : {
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

const setMediaBreakpointUpEvent = function (media) {
  const self = this;

  return media
    .set('(min-width: 576px)', function (event) {
      self.size.up.sm = event.matches;
    }, true)
    .set('(min-width: 768px)', function (event) {
      self.size.up.md = event.matches;
    }, true)
    .set('(min-width: 992px)', function (event) {
      self.size.up.lg = event.matches;
    }, true)
    .set('(min-width: 1200px)', function (event) {
      self.size.up.xl = event.matches;
      self.size.only.xl = event.matches;
    }, true);
}

const setMediaBreakpointOnlyEvent = function (media) {
  const self = this;

  return media
    .set('(max-width: 575.98px)', function (event) {
      self.size.only.xs = event.matches;
      self.size.down.xs = event.matches;
    }, true)
    .set('(min-width: 576px) and (max-width: 767.98px)', function (event) {
      self.size.only.sm = event.matches;
    }, true)
    .set('(min-width: 768px) and (max-width: 991.98px)', function (event) {
      self.size.only.md = event.matches;
    }, true)
    .set('(min-width: 992px) and (max-width: 1199.98px)', function (event) {
      self.size.only.lg = event.matches;
    }, true);
}

const setMediaBreakpointDownEvent = function (media) {
  const self = this;

  return media
    .set('(max-width: 767.98px)', function (event) {
      self.size.down.sm = event.matches;
    }, true)
    .set('(max-width: 991.98px)', function (event) {
      self.size.down.md = event.matches;
    }, true)
    .set('(max-width: 1199.98px)', function (event) {
      self.size.down.lg = event.matches;
    }, true);
}

const getSizeBetween = function (lower, upper) {

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

  return false
}


export default {
  install (Vue) {
    const vm = new Vue({
      data () {
        return { size };
      },
      methods: {
        setMediaBreakpointUpEvent,
        setMediaBreakpointOnlyEvent,
        setMediaBreakpointDownEvent,
        getSizeBetween
      }
    });

    Vue.prototype.$mediaBreakpoint = vm.size;
    Vue.prototype.$mediaBreakpoint.between = vm.getSizeBetween;

    Vue.prototype.$Bmb = Vue.prototype.$mediaBreakpoint;
    Vue.prototype.$Bmb.between = Vue.prototype.$mediaBreakpoint.between;

    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('load',
      function () {

        vm.setMediaBreakpointUpEvent(new media())
          .getStatus(function (status, context) {
            context.trigger(status.querystrings);
          });

        vm.setMediaBreakpointOnlyEvent(new media())
          .getStatus(function (status, context) {
            context.trigger(status.querystrings);
          });

        vm.setMediaBreakpointDownEvent(new media())
          .getStatus(function (status, context) {
            context.trigger(status.querystrings);
          });

      }, false);

  }
};