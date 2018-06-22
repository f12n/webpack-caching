Webpack Caching

https://webpack.js.org/guides/caching/

This guide focuses on the configuration needed to ensure files produced by webpack compilation can remain cached unless their contents has changed.

# Output Filenames

A simple way to ensure the browser picks up changed files is by using output.filename [substitutions](https://webpack.js.org/configuration/output#output-filename). The [hash] substitution can be used to include a build-specific hash in the filename, however it's even better to use the [chunkhash] substitution which includes a chunk-specific hash in the filename.

