const fs = require("fs/promises");
const path = require("path");
const mime = require("mime-types");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const data = require("./seed.json");

const prisma = new PrismaClient();

async function main() {
  await prisma.availability.createMany({
    data: data.availabilities.map((description) => ({ description })),
  });

  console.log("\n📅  Availabilities added.");

  await prisma.disposition.createMany({
    data: data.dispositions.map((description) => ({ description })),
  });

  console.log("\n👺  Dispositions added.");

  await Promise.all(
    data.types.map(({ name, breeds }) =>
      prisma.type.create({
        data: {
          name,
          breeds: {
            createMany: {
              data: breeds.map((name) => ({ name })),
            },
          },
        },
      })
    )
  );

  console.log("\n🐶  Animals added.");

  await prisma.user.createMany({ data: data.users });

  console.log("\n👥  Users added.");

  // map profile properties to their ids
  const [availabilities, dispositions, breeds] = await Promise.all([
    mapResults(prisma.availability.findMany()),
    mapResults(prisma.disposition.findMany()),
    mapResults(prisma.breed.findMany()),
  ]);

  // seed profiles
  await Promise.all(
    data.profiles.map(
      async ({
        dob,
        availability,
        breed,
        dispositions: _dispositions,
        image,
        ...rest
      }) =>
        prisma.profile.create({
          data: {
            ...rest,
            dob: new Date(dob),
            breedId: breeds.get(breed),
            availabilityId: availabilities.get(availability),
            dispositions: {
              create: _dispositions.map((description) => ({
                dispositionId: dispositions.get(description),
              })),
            },
            images: {
              create: [
                {
                  name: `${uuidv4()}${path.extname(image)}`,
                  mimeType: mime.lookup(image),
                  contents: await fs.readFile(path.resolve(__dirname, image)),
                },
              ],
            },
          },
        })
    )
  );

  console.log("\n💜  Profiles added.");
}

async function mapResults(promise) {
  const results = await promise;
  const map = new Map();

  for (const { id, name, description } of results) {
    if (name) {
      map.set(name, id);
    } else {
      map.set(description, id);
    }
  }

  return map;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
