import media from 'media-queries';

export default {
  install: function (Vue, options) {

    if (typeof window === 'object') {

      new Vue({
        data () {
          return {
            size: {
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
            }
          }
        },
        created () {
          Vue.prototype.$mediaBreakpoint = this.size;
          Vue.prototype.$mediaBreakpoint.between = this.getSizeBetween;

          Vue.prototype.$Bmb = Vue.prototype.$mediaBreakpoint;
          Vue.prototype.$Bmb.between = Vue.prototype.$mediaBreakpoint.between;


          this.setMediaBreakpointUpEvent(new media())
            .getStatus(function (status, context) {
              context.trigger(status.querystrings);
          });

          this.setMediaBreakpointOnlyEvent(new media())
            .getStatus(function (status, context) {
              context.trigger(status.querystrings);
          });

          this.setMediaBreakpointDownEvent(new media())
            .getStatus(function (status, context) {
              context.trigger(status.querystrings);
          });
        },
        methods: {
          setMediaBreakpointUpEvent (media) {
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
          },
          setMediaBreakpointOnlyEvent (media) {
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
          },
          setMediaBreakpointDownEvent (media) {
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
          },
          getSizeBetween (lower, upper) {

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
        }
      });

    } else {
      Vue.prototype.$mediaBreakpoint = {
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
        },
        between: new Function
      }
    }

  }
};