import executeQuery from "./db";

export default async function getListOfBreeds() {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM breeds",
    });
    return result[0];
  } catch (error) {
    console.log(error);
  }
}
