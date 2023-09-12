import request from "supertest";
import admin from "firebase-admin";
import mongoose from "mongoose";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../..";
import { paths } from "../../paths/paths";
import connectToDatabase from "../../../database/connectToDatabase";
import User from "../../../database/models/User";

jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);

  const token: Partial<DecodedIdToken> = {};

  admin.auth = jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue(token),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given an endpoint GET '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should should respond  with an status 200 and a message 'Pong 🏓'", async () => {
      const expectedMessage = "Pong 🏓";
      const expectedStatusCode = 200;
      const path = paths.slash;

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});

describe("Given a GET '/record' endpoint", () => {
  describe("When there's a valid token and user, and it receives a request", () => {
    test("Then it should should respond  with an status 404 and an error message 'Endpoint not found'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Endpoint not found";
      const path = paths.nonExistent;

      User.findOne = jest.fn().mockResolvedValue({});

      const response = await request(app)
        .get(path)
        .set("Authorization", "Bearer ")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
