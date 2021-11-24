import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";
import { emailExists, hashPassword, registerUser } from "~/lib/user";

jest.mock("bcrypt");

jest.mock("~/lib/prisma", () => ({
  user: {
    count: jest.fn(),
    create: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("emailExists", () => {
  it("returns true if the email exists", async () => {
    prisma.user.count.mockResolvedValue(1);
    const result = await emailExists("foo@example.com");
    expect(result).toBe(true);
  });

  it("returns false if the email does not exist", async () => {
    prisma.user.count.mockResolvedValue(0);
    const result = await emailExists("foo@example.com");
    expect(result).toBe(false);
  });
});

describe("hashPassword", () => {
  it("hashes the password with 10 salt rounds", async () => {
    await hashPassword("foo");
    expect(bcrypt.hash).toHaveBeenCalledWith("foo", 10);
  });
});

describe("registerUser", () => {
  it("creates a user with the correct data", async () => {
    await registerUser({
      email: "foo@example.com",
      hash: "bar",
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: "foo@example.com",
        password: "bar",
      },
    });
  });
});
