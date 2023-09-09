import { type Response, type NextFunction } from "express";
import { type AuthRequest } from "../../types";
import admin from "firebase-admin";
import auth from "./auth";
import CustomError from "../../../CustomError/CustomError";
import User from "../../../database/models/User";
import { type MongooseUserStructure } from "../../../types";
import { userIdMock } from "../../../mocks/usersMock";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

jest.mock("firebase-admin");

describe("Given an auth middleware", () => {
  const res: Partial<Response> = {};

  describe("When it receives a next function and a request with a valid token and a valid user", () => {
    test("Then it should call the received next function", async () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue("Bearer token"),
      };
      const next: NextFunction = jest.fn();
      const user: Partial<MongooseUserStructure> = { _id: userIdMock };
      const token: Partial<DecodedIdToken> = {};

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });
      User.findOne = jest.fn().mockResolvedValue(user);

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a next function and a request without a token", () => {
    test("Then it should call the received next function with the error 'Token not provided'", async () => {
      const expectedError = new CustomError(
        "Token not provided",
        401,
        "Invalid Token",
      );

      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue(""),
      };
      const next: NextFunction = jest.fn();

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a next function and a request with an invalid token", () => {
    test("Then it should call the received next function with the error 'Firebase ID token has expired'", async () => {
      const expectedError = new CustomError(
        "Firebase ID token has expired",
        401,
        "Invalid Token",
      );

      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue("Bearer token"),
      };
      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockRejectedValue(expectedError),
      });
      const next: NextFunction = jest.fn();

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a next function and a request with an valid token but the user doesn't exist", () => {
    test("Then it should call the received next function with the error 'User not found'", async () => {
      const expectedError = new CustomError(
        "User not found",
        401,
        "User not found",
      );
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue("Bearer token"),
      };
      const next: NextFunction = jest.fn();

      const token: Partial<DecodedIdToken> = {};

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });
      User.findOne = jest.fn().mockResolvedValue(null);

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
