# vue-b-media-breakpoint
vue-b-media-breakpoint is like bootstrap 4 responsive breakpoints that js tool

<h3>Install</h3>

```
npm install --save vue-b-media-breakpoint
```

```
import Vue from 'vue';
import vueBMediaBreakpoint from 'vue-b-media-breakpoint';

Vue.use(vueBMediaBreakpoint);
```

<h3>Usage</h3>

using `$mediaBreakpoint` or `$Bmb` to get responsive breakpoints of status with type of boolean  <br>
`$mediaBreakpoint` has properties that [down, only, up] type <br>
up includes [sm, md, lg, xl] size <br>
only includes [xs, sm, md, lg, xl] size <br>
down includes [xs, sm, md, lg] size <br>
`$Bmb`.`[type]`.`[size]` <br>
`$Bmb.between` is a function that just like `media-breakpoint-between` sass mixin
```vue

    <div v-if="$Bmb.up.sm">
      media-breakpoint-up(sm) = (min-width: 576px)
    </div>

    <div v-if="$Bmb.up.md">
      media-breakpoint-up(md) = (min-width: 768px)
    </div>

    <div v-if="$Bmb.up.lg">
      media-breakpoint-up(lg) = (min-width: 992px)
    </div>

    <div v-if="$Bmb.up.xl">
      media-breakpoint-up(xl) = (min-width: 1200px)
    </div>


    <div v-if="$Bmb.only.xs">
      media-breakpoint-only(xs) = (max-width: 575.98px)
    </div>

    <div v-if="$Bmb.only.sm">
      media-breakpoint-only(sm) = (min-width: 576px) and (max-width: 767.98px)
    </div>

    <div v-if="$Bmb.only.md">
      media-breakpoint-only(md) = (min-width: 768px) and (max-width: 991.98px)
    </div>

    <div v-if="$Bmb.only.lg">
      media-breakpoint-only(lg) = (min-width: 992px) and (max-width: 1199.98px)
    </div>

    <div v-if="$Bmb.only.xl">
      media-breakpoint-only(xl) = (min-width: 1200px)
    </div>


    <div v-if="$Bmb.down.xs">
      media-breakpoint-down(xs) = (max-width: 575.98px)
    </div>

    <div v-if="$Bmb.down.sm">
      media-breakpoint-down(sm) = (max-width: 767.98px)
    </div>

    <div v-if="$Bmb.down.md">
      media-breakpoint-down(md) = (max-width: 991.98px)
    </div>

    <div v-if="$Bmb.down.lg">
      media-breakpoint-down(lg) = (max-width: 1199.98px)
    </div>


    <div v-if="$Bmb.between('md', 'xl')">
      media-breakpoint-up(md) = (min-width: 768px)
      and
      ...xl
    </div>
```
set watch
```vue
    watch     : {
      $Bmb: {
        handler (_$Bmb) {
          // do something when every changed
        },
        deep: true
      }
    }
```

every breakpoint refer [Bootstrap Layout](https://getbootstrap.com/docs/4.0/layout/overview/)
