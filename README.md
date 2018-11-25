# vue-b-media-breakpoint
vue-b-media-breakpoint is like bootstrap 4 responsive breakpoints that js tool

example

```vue
    <div v-if="$mediaBreakpoint.up.lg">
      test lg
    </div>

    <div>
      {{ $mediaBreakpoint.between('sm', 'lg') }}
    </div>
```


every breakpoint refer [Here](https://getbootstrap.com/docs/4.0/layout/overview/)
