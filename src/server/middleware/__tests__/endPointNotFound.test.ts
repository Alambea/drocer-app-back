import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { endpointNotFound } from "../errors.js";

describe("Given an endpointNotFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the receives next function with a 'Endpoint not found' and 404", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {};
      const next: NextFunction = jest.fn();
      const expectedCustomError = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found",
      );

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
