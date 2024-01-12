import { type Request, type Response } from "express";
import { massiveRecordPostMock, recordsMock } from "../../../mocks/recordsMock";
import { addRecordController } from "../recordsControllers";
import Record from "../../../database/models/Record";
import CustomError from "../../../CustomError/CustomError";
import { type CustomRequest } from "../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  body: recordsMock,
};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Given a addRecordController", () => {
  describe("When it receives a response and a request with a record 'Mezzanine'", () => {
    Record.create = jest.fn().mockReturnValue(massiveRecordPostMock);

    test("Then it should call the response's method status with 201", async () => {
      const expectedStatusCode = 201;

      await addRecordController(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a record 'Mezzanine'", async () => {
      const expectedRecord = { record: massiveRecordPostMock };

      await addRecordController(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedRecord);
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next function with a 500 'Can't create the record'", async () => {
      const expectedError = new CustomError(
        "Can't create the record",
        500,
        "Can't create the record",
      );

      Record.create = jest.fn().mockRejectedValue(expectedError);

      await addRecordController(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
