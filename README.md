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



