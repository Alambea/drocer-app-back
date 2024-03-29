import { type Request, type Response } from "express";
import { type NextFunction } from "connect";
import { getRecordsController } from "../recordsControllers";
import Record from "../../../database/models/Record";
import { recordsMock } from "../../../mocks/recordsMock";
import CustomError from "../../../CustomError/CustomError";
import { type CustomRequest } from "../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = { query: { limit: "", skip: "" } };
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given a getRecordsController", () => {
  describe("When it receives a response ", () => {
    Record.find = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      count: jest.fn().mockReturnValue(recordsMock.length),
      exec: jest.fn().mockResolvedValue(recordsMock),
    });

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;

      await getRecordsController(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the records 'LP1' and 'ISON'", async () => {
      const expectedRecords = {
        count: recordsMock.length,
        records: recordsMock,
      };

      await getRecordsController(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedRecords);
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next funcion with a 500 'Can't retrieve records' error", async () => {
      const expectedError = new CustomError(
        "Can't retrieve records",
        500,
        "Can't retrieve records",
      );

      Record.find = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getRecordsController(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
