const { Task } = require("zenaton");

module.exports = Task("NotifyOwnerOfNonPayment", function(done) {
  console.log("NotifyOwnerOfNonPayment...");
  done();
});
