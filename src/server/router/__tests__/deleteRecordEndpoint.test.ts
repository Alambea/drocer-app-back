import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import admin from "firebase-admin";
import mongoose from "mongoose";
import Record from "../../../database/models/Record";
import { recordToDeleteIdMock, recordsMock } from "../../../mocks/recordsMock";
import { paths } from "../../paths/paths";
import request from "supertest";
import User from "../../../database/models/User";
import { authIdMock, userMock } from "../../../mocks/usersMock";
import app from "../..";

jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

const token: Partial<DecodedIdToken> = { uid: authIdMock };

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(token),
});

describe("Given a DELETE '/records:id' endpoint", () => {
  describe("When it receives a request with the id to delete", () => {
    test("Then it should respond with a status 200 and the message 'Record deleted successfully'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Record deleted successfully";

      await Record.create(recordsMock);
      await User.create(userMock);

      const response = await request(app)
        .delete(`${paths.getRecords}/${recordToDeleteIdMock}`)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      const responseBody = response.body as { message: string };

      expect(responseBody).toHaveProperty("message", expectedMessage);
    });
  });
});
