import { creatingApp } from "../src/game/game";

test("App created", () => {
  const app = creatingApp();
  expect(app).toBeDefined();
});
