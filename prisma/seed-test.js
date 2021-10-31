const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const user = {
  email: "test@example.com",
  password: "$2b$10$TncgHn9sFEWmlieQgY9JmOqt/RxyZxuySRLr8S5VE/9gPQliURZwe",
};

async function main() {
  await prisma.user.create({ data: user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
