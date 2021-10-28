const createMessage = (name, message) => {
  return { user: name, message, date: new Date().getTime() };
};

module.exports = { createMessage };
