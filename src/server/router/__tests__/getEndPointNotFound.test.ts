import request from "supertest";
import app from "../../index";

describe("Given a GET '/error' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should should respond  with an status 404 and an error message 'Endpoint not found'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Endpoint not found";
      const path = "/error";

      const response = await request(app).get(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
