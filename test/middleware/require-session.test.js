import { getSession } from "next-auth/client";
import requireSession from "~/middleware/require-session";
import { mockNext, mockRes } from "./mocks";

jest.mock("next-auth/client");

describe("requireAdminSession", () => {
  let middleware;

  beforeEach(() => {
    jest.clearAllMocks();
    middleware = requireSession(["POST"]);
  });

  describe("when the method is not defined", () => {
    let req;

    beforeEach(() => {
      req = { method: "GET" };
    });

    it("calls the next middleware", async () => {
      await middleware(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("when the method is defined", () => {
    let req;

    beforeEach(() => {
      req = { method: "POST" };
    });

    it("checks if the user is logged in", async () => {
      await middleware(req, mockRes, mockNext);

      expect(getSession).toHaveBeenCalledWith(expect.objectContaining({ req }));
    });

    describe("when the user is logged in", () => {
      beforeEach(() => {
        getSession.mockResolvedValue(1);
      });

      it("calls the next middleware", async () => {
        await middleware(req, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });

    describe("when the user is not an admin", () => {
      beforeEach(() => {
        getSession.mockResolvedValue(null);
      });

      it("does not call the next middleware", async () => {
        await middleware(req, mockRes, mockNext);
        expect(mockNext).not.toHaveBeenCalled();
      });

      it("sets the status to 401", async () => {
        await middleware(req, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(401);
      });

      it("sends a message", async () => {
        await middleware(req, mockRes, mockNext);
        expect(mockRes.send).toHaveBeenCalledWith("Unauthorized");
      });
    });
  });
});
