import { creatingApp } from '../js/game';

test('App created', () => {
  const app = creatingApp();
  expect(app).toBeDefined();
});
