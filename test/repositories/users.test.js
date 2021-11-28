import bcrypt from "bcrypt";
import prisma from "~/prisma";
import {
  emailExists,
  findUserByEmail,
  hashPassword,
  registerUser,
} from "~/repositories/users";

jest.mock("bcrypt");

jest.mock("~/prisma", () => ({
  user: {
    count: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("findUserByEmail", () => {
  it("finds a user by their email", async () => {
    const email = "foo@example.com";
    await findUserByEmail(email);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
  });
});

describe("emailExists", () => {
  it("counts the number of users with the given email", async () => {
    const email = "foo@example.com";
    await emailExists(email);
    expect(prisma.user.count).toHaveBeenCalledWith({ where: { email } });
  });

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
    const email = "foo@example.com";
    const hash = "bar";

    await registerUser(email, hash);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email,
        password: hash,
      },
    });
  });
});