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
