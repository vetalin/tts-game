"use strict";
exports.__esModule = true;
exports.creatingApp = void 0;
var PIXI = require("pixi.js");
var land_builder_1 = require("./land-builder");
var creatingApp = function () {
    var app = new PIXI.Application({
        width: 800,
        height: 600,
        antialias: true,
        transparent: false,
        resolution: 1
    });
    document.body.appendChild(app.view);
    (0, land_builder_1.buildLand)(app);
    return app;
};
exports.creatingApp = creatingApp;
