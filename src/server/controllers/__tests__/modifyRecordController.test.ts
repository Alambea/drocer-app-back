import { type NextFunction, type Response } from "express";
import Record from "../../../database/models/Record";
import { type AuthRequest } from "../../types";
import { modifyRecordController } from "../recordsControllers";
import { recordIdMock, recordsMock } from "../../../mocks/recordsMock";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<AuthRequest> = {
  body: { rating: 5 },
  params: {
    id: recordIdMock,
  },
};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given a modifyRecordController", () => {
  describe(`When it receives a response and a request with an id ${recordIdMock} and a value to update range: 4`, () => {
    Record.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(recordsMock[1]),
    });

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;

      await modifyRecordController(req as AuthRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the record 'In Rainbows' updated", async () => {
      const expectedRecord = { record: recordsMock[1] };

      await modifyRecordController(req as AuthRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedRecord);
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next funcion with a 500 'Failed to modify record' error", async () => {
      const expectedError = new CustomError(
        "Failed to modify record",
        304,
        "Failed to modify record",
      );

      Record.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await modifyRecordController(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
