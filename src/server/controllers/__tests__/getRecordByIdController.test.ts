import { type Response, type NextFunction } from "express";
import { recordsMock, fkaRecordIdMock } from "../../../mocks/recordsMock";
import Record from "../../../database/models/Record";
import { getRecordByIdController } from "../recordsControllers";
import { type CustomRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<CustomRequest> = {
  params: { id: fkaRecordIdMock },
};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given an getRecordByIdController controller", () => {
  describe(`When it receives a request with id ${fkaRecordIdMock} and a next function`, () => {
    Record.findById = jest
      .fn()
      .mockReturnValue({ select: jest.fn().mockReturnValue(recordsMock[0]) });

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;

      await getRecordByIdController(
        req as CustomRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the record 'LP1'", async () => {
      const expectedRecord = { record: recordsMock[0] };

      await getRecordByIdController(
        req as CustomRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedRecord);
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next funcion with a 500 'Can't retrieve record' error", async () => {
      const expectedError = new CustomError(
        "Can't retrieve record",
        500,
        "Can't retrieve record",
      );
      Record.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockRejectedValue(expectedError),
      });

      await getRecordByIdController(
        req as CustomRequest,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
