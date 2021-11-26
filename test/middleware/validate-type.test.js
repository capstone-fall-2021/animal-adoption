import validateType from "~/middleware/validate-type";
import { getTypeByName } from "~/repositories/types";
import { mockNext, mockRes } from "./mocks";

jest.mock("~/repositories/types");

describe("validateType", () => {
  let req;
  let middleware;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      query: { type: "foo " },
    };

    middleware = validateType("type");
  });

  describe("when the type is valid", () => {
    const type = {
      id: 1,
      name: "foo",
    };

    beforeEach(() => {
      getTypeByName.mockResolvedValue(type);
    });

    it("adds type to the request", async () => {
      await middleware(req, mockRes, mockNext);
      expect(req.type).toBe(type);
    });

    it("calls the next middleware", async () => {
      await middleware(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("when the type is invalid", () => {
    beforeEach(() => {
      getTypeByName.mockResolvedValue(null);
    });

    it("does not call the next middleware", async () => {
      await middleware(req, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("sets the status to 404", async () => {
      await middleware(req, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it("sends a message", async () => {
      await middleware(req, mockRes, mockNext);
      expect(mockRes.send).toHaveBeenCalledWith("Not found");
    });
  });
});
