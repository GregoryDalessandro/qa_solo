# qa_solo

- [Summary](#summary)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [What Do I Test](#what-do-I-test)
- [How Do I Test](#how-do-I-test)
- [Page Objects](#page-objects)

##Summary
This is my Solo Capstone for Devmountain QA Remote Part Time course. It uses Jest as a test runner, and Selenium Webdriver to hook into the browser.

## Setup
1. Clone the repo
2. Install dependencies: `npm i`

## Running Tests
To run all tests, use the command: `npm test`
To run a specific test, use the command `npx jest test_name`

## What do I Test
1. Sign Up/In/Out
2. Add to Cart
3. Place order
4. Remove from cart
5. Website Navigation 

## How do I test
Broke down testing into the following areas:
1. Sign Up, Sign In, Sign Out
2. Add to Cart, Remove from Cart, Place Order
3. Contact

## Page Objects
1. index
2. cart (extends index)
3. prod (product) (extends index)
