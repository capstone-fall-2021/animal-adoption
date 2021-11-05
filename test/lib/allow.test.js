import allow from "~/lib/allow";

describe("allow", () => {
  const mockRes = {
    setHeader: jest.fn(),
    end: jest.fn(),
  };

  mockRes.status = jest.fn(() => mockRes);

  const mockNext = jest.fn();
  const handler = allow(["GET", "POST"], mockNext);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when method is allowed", () => {
    const req = { method: "GET" };

    beforeEach(() => {
      handler(req, mockRes);
    });

    it("calls the next middleware function", () => {
      expect(mockNext).toHaveBeenCalledWith(req, mockRes);
    });
  });

  describe("when method is not allowed", () => {
    const req = { method: "PUT" };

    beforeEach(() => {
      handler(req, mockRes);
    });

    it("sets the Allow header", () => {
      expect(mockRes.setHeader).toHaveBeenCalledWith("Allow", ["GET", "POST"]);
    });

    it("sets the status to 405", () => {
      expect(mockRes.status).toHaveBeenCalledWith(405);
    });

    it("returns an error message", () => {
      expect(mockRes.end).toHaveBeenCalledWith("Method PUT Not Allowed");
    });
  });
});
