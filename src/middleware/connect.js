import nc from "next-connect";

export default function connect() {
  return nc({
    onError: (err, req, res) => {
      if (err.name === "ValidationError") {
        res.status(400).json({ error: err.errors[0] });
      } else {
        console.error(err.stack);
        res.status(500).send(err.message);
      }
    },
    onNoMatch: (req, res) => {
      res.status(405).send("Method not allowed");
    },
  });
}
