import validateBreed from "~/middleware/validate-breed";
import { getBreedByName } from "~/repositories/breeds";
import { mockNext, mockRes } from "./mocks";

jest.mock("~/repositories/breeds");

describe("validateBreed", () => {
  let req;
  let middleware;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      query: { breed: "foo " },
    };

    middleware = validateBreed("breed");
  });

  describe("when the breed is valid", () => {
    const breed = {
      id: 1,
      name: "foo",
    };

    beforeEach(() => {
      getBreedByName.mockResolvedValue(breed);
    });

    it("adds breed to the request", async () => {
      await middleware(req, mockRes, mockNext);
      expect(req.breed).toBe(breed);
    });

    it("calls the next middleware", async () => {
      await middleware(req, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("when the breed is invalid", () => {
    beforeEach(() => {
      getBreedByName.mockResolvedValue(null);
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
