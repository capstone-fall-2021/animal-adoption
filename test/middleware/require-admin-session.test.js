import requireAdminSession from "~/middleware/require-admin-session";
import { getSessionUser } from "~/session";
import { mockNext, mockRes } from "./mocks";

jest.mock("~/session");

describe("requireAdminSession", () => {
  let middleware;

  beforeEach(() => {
    jest.clearAllMocks();
    middleware = requireAdminSession(["POST"]);
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

    it("checks if the user is an admin", async () => {
      await middleware(req, mockRes, mockNext);

      expect(getSessionUser).toHaveBeenCalledWith(
        expect.objectContaining({ req })
      );
    });

    describe("when the user is an admin", () => {
      beforeEach(() => {
        getSessionUser.mockResolvedValue({ admin: true });
      });

      it("calls the next middleware", async () => {
        await middleware(req, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });

    describe("when the user is not an admin", () => {
      beforeEach(() => {
        getSessionUser.mockResolvedValue({ admin: false });
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
