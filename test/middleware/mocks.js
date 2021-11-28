export const mockNext = jest.fn();

export const mockRes = ["json", "send", "status"].reduce((acc, method) => {
  acc[method] = jest.fn(() => acc);
  return acc;
}, {});
