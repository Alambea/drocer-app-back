import request from "supertest";
import app from "../..";
import { paths } from "../../paths/paths";

describe("Given an endpoint GET '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should should respond  with an status 200 and a message 'Pong 🏓'", async () => {
      const expectedMessage = "Pong 🏓";
      const expectedStatusCode = 200;
      const path = paths.ping;

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});

describe("Given a GET '/record' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should should respond  with an status 404 and an error message 'Endpoint not found'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Endpoint not found";
      const path = "/record";

      const response = await request(app).get(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
