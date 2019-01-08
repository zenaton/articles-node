require("dotenv").config();
const express = require("express");

const CollectRentWorkflow = require("./workflows/collect-rent-workflow");

// Start Zenaton client
require("./client");

// Start the workflow
const FAKE_PLACE_ID = "FOO";
const FAKE_TENANT_ID = "BAR";
const MONTH = "0";
const YEAR = "2019";

new CollectRentWorkflow({
  placeId: FAKE_PLACE_ID,
  tenantId: FAKE_TENANT_ID,
  month: MONTH,
  year: YEAR
}).dispatch().catch((err) => {
  console.error(err);
});

// Start the Express app
const app = express();

app.post("/pay-rent/:placeId/:tenantId", function (req, res, next) {
  const { placeId, tenantId } = req.params;
  const { month, year } = req.query;

  const workflowInstanceId = `TENANT#${tenantId}-PLACE#${placeId}-MONTH#${month}-YEAR#${year}`;

  CollectRentWorkflow
    .whereId(workflowInstanceId)
    .send("RentPaid", {})
    .then(() => {
      res.sendStatus(200);
    }, (err) => {
      next(err);
    });
});

// Use this curl to trigger rent payment
// curl -X POST 'http://localhost:8080/pay-rent/FOO/BAR?month=0&year=2019'

app.listen(8080);
