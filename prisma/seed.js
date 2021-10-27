const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const types = [
  {
    name: "dog",
    breeds: {
      create: [
        {
          name: "Corgi",
        },
        {
          name: "Rat Terrier",
        },
        {
          name: "German Shepherd",
        },
      ],
    },
  },
  {
    name: "cat",
    breeds: {
      create: [
        {
          name: "Siamese",
        },
      ],
    },
  },
  {
    name: "other",
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
