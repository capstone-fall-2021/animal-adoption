const allow = (methods, next) => async (req, res) => {
  if (methods.includes(req.method)) {
    await next(req, res);
  } else {
    res.setHeader("Allow", methods);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default allow;
