const { Task } = require("zenaton");

module.exports = Task("AskForRentPayment", function(done) {
  console.log("Ask for rent payment...");
  done();
});
