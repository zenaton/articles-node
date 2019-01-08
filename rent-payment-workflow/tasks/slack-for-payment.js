const { Task } = require("zenaton");

module.exports = Task("SlackForPayment", function(done) {
  console.log("Slacking for payment...");
  done();
});
