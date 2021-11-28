import bcrypt from "bcrypt";
import prisma from "~/prisma";
import { findUserByEmail, createUser } from "~/repositories/users";

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

describe("createUser", () => {
  const email = "foo@example.com";
  const password = "bar";

  beforeEach(() => {
    bcrypt.hash.mockResolvedValue("baz");
  });

  it("hashes the password", async () => {
    await createUser(email, password);
    expect(bcrypt.hash).toHaveBeenCalledWith("bar", 10);
  });

  it("creates a user with the correct data", async () => {
    await createUser(email, password);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email,
        password: "baz",
      },
    });
  });
});
