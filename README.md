# vue-b-media-breakpoint
vue-b-media-breakpoint is like bootstrap 4 responsive breakpoints that js tool

<h3>Install</h3>
````
npm install --save vue-b-media-breakpoint
````

<h3>Usage</h3>
````
import Vue from 'vue';
import vueBMediaBreakpoint from 'vue-b-media-breakpoint';

Vue.use(vueBMediaBreakpoint);
````

<h3>Simple</h3>
```vue
    <div v-if="$mediaBreakpoint.up.lg">
      test lg
    </div>

    <div>
      {{ $mediaBreakpoint.between('sm', 'lg') }}
    </div>
```


every breakpoint refer [Bootstrap Layout](https://getbootstrap.com/docs/4.0/layout/overview/)
