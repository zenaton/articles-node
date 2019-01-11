require("dotenv").config();
const express = require("express");
const uuid = require("uuid/v4");

const CollectRentWorkflow = require("./workflows/collect-rent-workflow");

// Start Zenaton client
require("./client");

// Start the workflow
const FAKE_PLACE_ID = uuid();
const FAKE_TENANT_ID = uuid();
const MONTH = "0";
const YEAR = "2019";

new CollectRentWorkflow({
  placeId: FAKE_PLACE_ID,
  tenantId: FAKE_TENANT_ID,
  month: MONTH,
  year: YEAR
})
  .dispatch()
  .catch(err => {
    console.error(err);
  });

console.log("Use this curl to trigger rent payment");
console.log(
  `curl -X POST 'http://localhost:8080/pay-rent/${FAKE_PLACE_ID}/${FAKE_TENANT_ID}?month=${MONTH}&year=${YEAR}'`
);

// Start the Express app
const app = express();

app.post("/pay-rent/:placeId/:tenantId", function(req, res, next) {
  const { placeId, tenantId } = req.params;
  const { month, year } = req.query;

  const workflowInstanceId = `TENANT#${tenantId}-PLACE#${placeId}-MONTH#${month}-YEAR#${year}`;

  CollectRentWorkflow.whereId(workflowInstanceId)
    .send("RentPaid", {})
    .then(
      () => {
        res.sendStatus(200);
      },
      err => {
        next(err);
      }
    );
});

app.listen(8080);
