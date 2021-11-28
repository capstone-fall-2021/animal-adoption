import { getBreedByName } from "~/repositories/breeds";

export default function validateBreed(param) {
  return async (req, res, next) => {
    const breed = await getBreedByName(req.query[param]);

    if (breed) {
      req.breed = breed;
      return next();
    }

    res.status(404).send("Not found");
  };
}
