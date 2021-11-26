const { PrismaClient } = require("@prisma/client");
const { CAT_BREEDS, DOG_BREEDS, OTHER_BREEDS } = require("./breeds");

const prisma = new PrismaClient();

function mapBreed(name) {
  return {
    name,
  };
}

const types = [
  {
    name: "dog",
    breeds: {
      create: DOG_BREEDS.map(mapBreed),
    },
  },
  {
    name: "cat",
    breeds: {
      create: CAT_BREEDS.map(mapBreed),
    },
  },
  {
    name: "other",
    breeds: {
      create: OTHER_BREEDS.map(mapBreed),
    },
  },
];

const dispositions = [
  { description: "Good with children" },
  { description: "Good with other animals" },
  { description: "Animal must be leashed at all times" },
];

const availabilities = [
  { description: "Not Available" },
  { description: "Available" },
  { description: "Pending" },
  { description: "Adopted" },
];

const user = {
  email: "test@example.com",
  password: "$2b$10$TncgHn9sFEWmlieQgY9JmOqt/RxyZxuySRLr8S5VE/9gPQliURZwe",
  admin: true,
};

async function main() {
  const promises = [];

  for (const type of types) {
    promises.push(prisma.type.create({ data: type }));
  }

  for (const disposition of dispositions) {
    promises.push(prisma.disposition.create({ data: disposition }));
  }

  for (const availability of availabilities) {
    promises.push(prisma.availability.create({ data: availability }));
  }

  promises.push(prisma.user.create({ data: user }));

  await Promise.all(promises);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
