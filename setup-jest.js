require("canvas");
require("jest-canvas-mock");

jest.mock("pixi.js", () => jest.requireActual("pixi.js-legacy"));
