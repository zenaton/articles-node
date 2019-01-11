# Rent Payment Workfow

This is the full implementation for the NodeJS rent payment workflow example introduced in our Medium article.

## Installation

* [Create a Zenaton account](https://zenaton.com/auth/register) if you don't already have one.

* If you don't have it, install the Zenaton agent.

```bash
curl https://install.zenaton.com | sh
```

* Clone this repo and open the `rent-payment-workflow` directory.

```bash
git clone https://github.com/zenaton/articles-node.git
cd articles-node/rent-payment-workflow
```

* Run `npm install` to install dependencies.

* Copy the `.env.example` file and name it `.env`. Update `ZENATON_APP_ID` and `ZENATON_API_TOKEN` values with your [Zenaton credentials](https://zenaton.com/app/api).

## Running

* Have the Zenaton agent listen to workflows by running the `listen` command.

```bash
zenaton listen --env=.env --boot=boot.js
```

* Run `npm start` to start the web server and our rent payment workflow.  
You should see immediately two new files: `zenaton.out` and a `zenaton.err`. The latter should always remain empty.  
In the `zenaton.out` file, your should see:

```
Ask for rent payment...
```

And if you wait for a minute, you should also see:

```
NotifyOwnerOfNonPayment...
```

* If you want to simulate a rent payment and see how the workflow switches codepath because of it, restart the web server with `npm start`, and within a minute, run the following `curl` command.

```bash
# If you have changed the workflow initial data, modify this command accordingly
curl -X POST 'http://localhost:8080/pay-rent/FOO/BAR?month=0&year=2019'
```

Now the `zenaton.out` file should read:

```
Ask for rent payment...
Slacking for payment...
```

* As an exercise, try to find where we configure how long we wait for the `RentPaid` event, and modify the value to wait longer or less.

## See also

Don't forget to check the [Zenaton documentation](https://zenaton.com/documentation) and feel free to modify this implementation to discover the many possibilities we have to offer.
