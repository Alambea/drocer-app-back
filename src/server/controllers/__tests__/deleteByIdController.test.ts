import { type NextFunction, type Request, type Response } from "express";
import { radioheadRecordIdMock } from "../../../mocks/recordsMock";
import Record from "../../../database/models/Record";
import { deleteByIdController } from "../recordsControllers";
import { type CustomRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  params: {
    id: radioheadRecordIdMock,
  },
};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given a deleteByIdController", () => {
  describe(`When it receives a request with id ${radioheadRecordIdMock} and a next function`, () => {
    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;
      Record.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await deleteByIdController(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the records 'LP1' and 'ISON'", async () => {
      const expectedMessage = { message: "Record deleted successfully" };

      await deleteByIdController(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next funcion with a 500 'Failed to delete record' error", async () => {
      const expectedError = new CustomError(
        "Failed to delete record",
        500,
        "Failed to delete record",
      );

      Record.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deleteByIdController(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
