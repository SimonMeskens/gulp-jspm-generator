const transform = require("through2").obj;

const PluginError = require("plugin-error");
const PLUGIN_NAME = "gulp-jspm-generator";

/**
 * @author Simon Meskens
 * @description JSPM Generator Plugin for Gulp
 * @license MIT
 *
 * @module gulp-jspm-generator
 *
 * @requires plugin-error
 * @requires through2
 *
 * @method gulp-jspm-generator
 *
 * @typedef {import('@jspm/generator').Generator} Generator
 *
 * @param  {Generator} generator JSPM Generator
 * @param  {Object}    options   Options
 *
 * @return {Function}            Stream (Transform)
 */
module.exports = function importmap(generator, options = {}) {
  if (!generator) {
    throw new PluginError({
      plugin: PLUGIN_NAME,
      message: "Missing JSPM Generator.",
      stack: err.stack,
      showStack: true,
    });
  }

  return transform((file, _, cb) => {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(
        new PluginError({
          plugin: PLUGIN_NAME,
          message: "Streams are not supported.",
        })
      );
    }

    return generator
      .htmlGenerate(file.contents.toString(), options)
      .then((html) => {
        file.contents = Buffer.from(html);
        cb(null, file);
      })
      .catch((err) => {
        cb(
          new PluginError({
            plugin: PLUGIN_NAME,
            message: err.message,
            stack: err.stack,
            showStack: true,
          })
        );
      });
  });
};
