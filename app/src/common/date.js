const getDatetime = () => {
  const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0];
  const time = new Date().toTimeString().split(" ")[0];
  return date + " " + time;
};

module.exports = {
  getDatetime,
};
