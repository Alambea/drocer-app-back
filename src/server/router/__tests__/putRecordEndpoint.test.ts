import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import admin from "firebase-admin";
import mongoose from "mongoose";
import Record from "../../../database/models/Record";
import {
  fkaRecordIdMock,
  fkaRecordMock,
  recordsMock,
} from "../../../mocks/recordsMock";
import { paths } from "../../paths/paths";
import request from "supertest";
import User from "../../../database/models/User";
import { authIdMock, userMock } from "../../../mocks/usersMock";
import app from "../..";
import { type RecordStructure } from "../../../types";

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

describe("Given a PATCH '/records:id' endpoint", () => {
  describe(`When it receives a request with the id to update ${fkaRecordIdMock} and a value to update rating: 5`, () => {
    test("Then it should respond with a status 200 and the record 'LP1' with the rating propery 5", async () => {
      const expectedStatusCode = 200;

      const path = `${paths.records}/${fkaRecordIdMock}`;
      const update: Partial<RecordStructure> = {
        ...fkaRecordMock,
        genres: "Avant-pop, electronic, art pop R&B, trip hop, cool stuff",
      };

      await Record.create(recordsMock);
      await User.create(userMock);

      const response = await request(app)
        .put(path)
        .set("Authorization", "Bearer token")
        .send(update)
        .expect(expectedStatusCode);

      const responseBody = response.body as { record: RecordStructure };

      expect(responseBody.record).toHaveProperty(
        "description",
        update.description,
      );
      expect(responseBody.record).toHaveProperty(
        "releaseDate",
        update.releaseDate,
      );
      expect(responseBody.record).toHaveProperty("genres", update.genres);
    });
  });
});
