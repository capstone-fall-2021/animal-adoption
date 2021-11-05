const allow = (methods, next) => (req, res) => {
  if (methods.includes(req.method)) {
    next(req, res);
  } else {
    res.setHeader("Allow", methods);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default allow;
