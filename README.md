Webpack Caching

https://webpack.js.org/guides/caching/

This guide focuses on the configuration needed to ensure files produced by webpack compilation can remain cached unless their contents has changed.

# Output Filenames

A simple way to ensure the browser picks up changed files is by using output.filename [substitutions](https://webpack.js.org/configuration/output#output-filename). The [hash] substitution can be used to include a build-specific hash in the filename, however it's even better to use the [chunkhash] substitution which includes a chunk-specific hash in the filename.

due to:
Output may differ depending on your current webpack version. Newer versions may not have all the same issues with hashing as some older versions, but we still recommend the following steps to be safe.

# Extracting Boilerplate (here no need to use webpack.optimize.CommonsChunkPlugin, it already deprecated. use [optimization.splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/) instead)

As we learned in [code splitting](https://webpack.js.org/guides/code-splitting), the [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin) can be used to split modules out into separate bundles. A lesser-known feature of the CommonsChunkPlugin is extracting webpack's boilerplate and manifest which can change with every build. By specifying a name not mentioned in the entry configuration, the plugin will automatically extract what we want into a separate bundle:

TODO: extract manifest to it bundle

extract third-party libraries  also doesn't work in that(the api doc refered) way

# Module Identifiers

we can see that all three have. This is because each module.id is incremented based on resolving order by default. Meaning when the order of resolving is changed, the IDs will be changed as well. So, to recap:

* The main bundle changed because of its new content.
* The vendor bundle changed because its module.id was changed.
* And, the manifest bundle changed because it now contains a reference to a new module.

The first and last are expected -- it's the vendor hash we want to fix. Luckily, there are two plugins we can use to resolve this issue. The first is the [NamedModulesPlugin](https://webpack.js.org/plugins/named-modules-plugin), which will use the path to the module rather than a numerical identifier. While this plugin is useful during development for more readable output, it does take a bit longer to run. The second option is the [HashedModuleIdsPlugin](https://webpack.js.org/plugins/hashed-module-ids-plugin), which is recommended for production builds:

run the build and after commented in index :
// import './chartComponent';
// import './loginButton';

run the build. 
Now, despite any new local dependencies, our vendor hash should stay consistent between builds:

# Conclusion

Caching gets messy. Plain and simple. However the walk-through above should give you a running start to deploying consistent, cachable assets. See the Further Reading section below to learn more.

# Further Reading(TODO)
* [Predictable Long Term Caching](https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31)
* [Long Term Caching of Static Assets](https://codeburst.io/long-term-caching-of-static-assets-with-webpack-1ecb139adb95?gi=9e32667ae5c5#.vtwnssps4)
* [Webpack & Caching](https://gist.github.com/sokra/ff1b0290282bfa2c037bdb6dcca1a7aa)
* [Advanced Webpack Presentation](https://presentations.survivejs.com/advanced-webpack/)
* [Issue 1315](https://github.com/webpack/webpack/issues/1315)
* [Issue 652](https://github.com/webpack/webpack.js.org/issues/652)
