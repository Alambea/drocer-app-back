import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import admin from "firebase-admin";
import mongoose from "mongoose";
import Record from "../../../database/models/Record";
import { recordsMock } from "../../../mocks/recordsMock";
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
  describe(`When it receives a request by the user ${userMock._id} with a limit of 3 and a 0 skip in the query params`, () => {
    test("Then it should respond with a status 200, the total count of 4 records and the records 'Mezzanine', 'Heliocentric' and 'Third' ", async () => {
      const expectedStatusCode = 200;
      const offset = "0";
      const limit = "3";

      const recordsByUser = recordsMock
        .reverse()
        .filter((record) => record.user === userMock._id);
      const expectedUserRecords = recordsByUser.slice(0, +limit);
      const expectedTotalUserRecords = recordsByUser.length;

      const recordsPath = paths.records;
      const queryParams = { limit, offset };

      for await (const record of recordsMock) {
        await Record.create(record);
      }

      await User.create(userMock);

      const response = await request(app)
        .get(recordsPath)
        .set("Authorization", "Bearer token")
        .query(queryParams)
        .expect(expectedStatusCode);

      const responseBody = response.body as {
        count: number;
        records: RecordStructure[];
      };

      responseBody.records.forEach((record, recordPosition) => {
        expect(record).toHaveProperty(
          "record",
          expectedUserRecords[recordPosition].record,
        );
      });
      expect(responseBody).toHaveProperty("count", expectedTotalUserRecords);
    });
  });

  describe(`When it receives a request by the user ${userMock._id} with a limit of 3 and a 3 skip in the query params`, () => {
    test("Then it should respond with a status 200, the total count of 4 records and the record 'LP1' ", async () => {
      const expectedStatusCode = 200;
      const offset = "3";
      const limit = "3";

      const recordsByUser = recordsMock.filter(
        (record) => record.user === userMock._id,
      );
      const expectedUserRecords = recordsByUser.slice(
        +offset,
        +offset + +limit,
      );
      const expectedTotalUserRecords = recordsByUser.length;

      const recordsPath = paths.records;
      const queryParams = { limit, offset };

      const response = await request(app)
        .get(recordsPath)
        .set("Authorization", "Bearer token")
        .query(queryParams)
        .expect(expectedStatusCode);

      const responseBody = response.body as {
        count: number;
        records: RecordStructure[];
      };

      responseBody.records.forEach((record, recordPosition) => {
        expect(record).toHaveProperty(
          "record",
          expectedUserRecords[recordPosition].record,
        );
      });
      expect(responseBody).toHaveProperty("count", expectedTotalUserRecords);
    });
  });
});
