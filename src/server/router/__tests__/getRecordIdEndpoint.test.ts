import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import admin from "firebase-admin";
import mongoose from "mongoose";
import Record from "../../../database/models/Record";
import { fkaRecordMock, recordsMock } from "../../../mocks/recordsMock";
import { paths } from "../../paths/paths";
import request from "supertest";
import { type RecordStructure } from "../../../types";
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

describe("Given a GET '/records' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and records 'LP1'", async () => {
      const expectedStatusCode = 200;
      const expectedRecordMock = fkaRecordMock;
      const recordsPath = `${paths.records}/${expectedRecordMock._id}`;

      await Record.create(recordsMock);
      await User.create(userMock);

      const response = await request(app)
        .get(recordsPath)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      const responseBody = response.body as { record: RecordStructure };

      expect(responseBody.record).toStrictEqual(expectedRecordMock);
    });
  });
});
