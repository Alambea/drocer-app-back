import request from "supertest";
import app from "../..";

describe("Given an endpoint GET '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should should respond  with an status 200 and a message 'Pong 🏓'", async () => {
      const expectedMessage = "Pong 🏓";
      const expectedStatusCode = 200;
      const path = "/";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
