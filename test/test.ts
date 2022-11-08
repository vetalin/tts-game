import { creatingApp } from "../src/game";

test("App created", () => {
  const app = creatingApp();
  expect(app).toBeDefined();
});
