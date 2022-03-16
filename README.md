<p align="center">
  <a href="https://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
  <p align="center">The streaming build system</p>
</p>

## JSPM Generator Gulp Plugin

JSPM Generator Plugin for Gulp

### Install

```bash
npm i -D gulp-jspm-generator
```

### Usage

```js
import { task, src, dest } from "gulp";

import { Generator } from "@jspm/generator";
import importmap from "gulp-jspm-generator";

const generator = new Generator({
  mapUrl: import.meta.url,
  env: ["production", "browser", "module"],
});

task("html", () => {
  return src("src/*.html")
    .pipe(importmap(generator, { esModuleShims: true }))
    .pipe(dest("dest"));
});
```
