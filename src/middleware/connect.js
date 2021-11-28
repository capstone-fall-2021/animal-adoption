import nc from "next-connect";

export default function connect() {
  return nc({
    onError: (err, req, res) => {
      console.error(err.stack);
      res.status(500).send(err.message);
    },
    onNoMatch: (req, res) => {
      res.status(405).send("Method not allowed");
    },
  });
}
