import admin from "firebase-admin";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../..";
import connectToDatabase from "../../../database/connectToDatabase";
import { type RecordStructure } from "../../../types";
import Record from "../../../database/models/Record";
import { massiveRecordPostMock, recordsMock } from "../../../mocks/recordsMock";
import { authIdMock, userMock } from "../../../mocks/usersMock";
import { paths } from "../../paths/paths";
import User from "../../../database/models/User";

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

describe("Given a POST '/records' endpoint", () => {
  describe("When it receives a request with a record 'Mezzanine'", () => {
    beforeEach(async () => {
      await Record.create();
    });

    test("Then it should respond with a status 201 and a record 'Mezzanine'", async () => {
      const expectedStatusCode = 201;
      const postMockRecord = massiveRecordPostMock;
      const recordsPath = paths.records;

      await Record.create(recordsMock);
      await User.create(userMock);

      const response = await request(app)
        .post(recordsPath)
        .set("Authorization", "Bearer ")
        .send(massiveRecordPostMock as Omit<RecordStructure, "id">)
        .expect(expectedStatusCode);

      expect(response.body.record).toHaveProperty(
        "record",
        postMockRecord.record,
      );
    });
  });
});
