// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, next) {
  // eslint-disable-next-line no-console
  console.log(err.message);
  res.status(500).send('Something failed');
};
