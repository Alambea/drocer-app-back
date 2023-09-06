import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../../CustomError/CustomError";
import { generalError } from "../errors";

describe("Given a generalError handler", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const req: Partial<Request> = {};
  const error = new CustomError("Records not found", 404, "Records not found");
  const next: NextFunction = jest.fn();

  describe("When it receives a response and an error with message 'Records not found' and status code 404", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Then it should call the received response's method status with 401", () => {
      const expectedStatusCode = 404;

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with the error 'Records not found'", () => {
      const expectedErrorMessage = { error: "Records not found" };

      generalError(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });

  describe("When it receives a response and an error without status code and without message", () => {
    test("Then it should call the received response's method status with 500", () => {
      const expectedStatusCode = 500;
      const error = new Error();

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with the error 'Internal server error'", () => {
      const expectedMessage = { error: "Internal server error" };
      const error = new Error();

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
