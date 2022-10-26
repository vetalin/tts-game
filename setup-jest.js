jest.mock('pixi.js', () => {
  return {
    default: jest.requireActual('pixi.js-legacy')
  };
});
