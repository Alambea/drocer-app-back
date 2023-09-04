import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { endPointNotFound } from "../errors";

describe("Given an endPointNotFound middleware", () => {
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

      endPointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
