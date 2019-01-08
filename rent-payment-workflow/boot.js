require("dotenv").config();

// Start Zenaton client
require("./client");

// Load workflows
require("./workflows/collect-rent-workflow");
