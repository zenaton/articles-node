const { Workflow, Wait } = require("zenaton");

const AskForRentPayment = require("../tasks/ask-for-rent-payment");
const SlackForPayment = require("../tasks/slack-for-payment");
const NotifyOwnerOfNonPayment = require("../tasks/notify-owner-of-non-payment");

module.exports = Workflow("CollectRent", {
  init(data) {
    this.data = data;
  },
  id() {
    const { tenantId, placeId, month, year } = this.data;
    return `TENANT#${tenantId}-PLACE#${placeId}-MONTH#${month}-YEAR#${year}`;
  },
  handle() {
    new AskForRentPayment(this.data).dispatch();

    const event = new Wait("RentPaid").minutes(1).execute();
    if (event) {
      new SlackForPayment(this.data).dispatch();
      return;
    }

    new NotifyOwnerOfNonPayment(this.data).dispatch();
  }
});
