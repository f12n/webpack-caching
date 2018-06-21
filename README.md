Webpack Code Splitting

https://webpack.js.org/guides/code-splitting/

Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

 three general approaches to code splitting available:

* Entry Points: Manually split code using entry configuration.
* Prevent Duplication: Use the SplitChunks to dedupe and split chunks.
* Dynamic Imports: Split code via inline function calls within modules.

### Entry Points pitfalls 

* If there are any duplicated modules between entry chunks they will be included in both bundles.
* It isn't as flexible and can't be used to dynamically split code with the core application logic.

### Prevent Duplication
Here are some other useful plugins and loaders provided by the community for splitting code:

* [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin): Useful for splitting CSS out from the main application.
* [bundle-loader](https://webpack.js.org/loaders/bundle-loader): Used to split code and lazy load the resulting bundles.
* [promise-loader](https://github.com/gaearon/promise-loader): Similar to the bundle-loader but uses promises.

The [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin) is also used to split vendor modules from core application code using [explicit vendor chunks](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk).


### Dynamic Imports

* The first and recommended approach is to use the [import() syntax](https://webpack.js.org/api/module-methods#import-) that conforms to the [ECMAScript proposal](https://github.com/tc39/proposal-dynamic-import) for dynamic imports. 

* The legacy, webpack-specific approach is to use [require.ensure](https://webpack.js.org/api/module-methods#require-ensure). Let's use the first approach


### Prefetching/Preloading modules

Using these inline directives while declaring your imports allows webpack to output “Resource Hint” which tells the browser that for:

* prefetch(may need in feature): resource is probably needed for some navigation in the future
* preload(required of currently): resource might be needed during the current navigation
Simple prefetch example can be having a HomePage component, which renders a LoginButton component which then on demand loads a LoginModal component after being clicked.

Preload directive has a bunch of differences compared to prefetch:

* A preloaded chunk starts loading in parallel to the parent chunk. A prefetched chunk starts after the parent chunk finish.
* A preloaded chunk has medium priority and instantly downloaded. A prefetched chunk is downloaded in browser idle time.
* A preloaded chunk should be instantly requested by the parent chunk. A prefetched chunk can be used anytime in the future.
* Browser support is different.

