import {BasePage} from "./pageObjects/basePage";
import {ProductPage} from "./pageObjects/productPage";
import {CartPage} from "./pageObjects/cartPage";
import {
  By,
  Builder,
  Capabilities,
  until,
  WebDriver,
  WebElement
} from "selenium-webdriver";

const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  const demoblaze = new BasePage(driver);
  const demoblazeProduct = new ProductPage(driver);
  const demoblazeCart = new CartPage(driver);

  describe ("demoblaze", () => {
    // navigate to the main page
    beforeEach(async () => {
      await driver.get(demoblaze.url);
    });
    afterAll(async ()=> {
      await driver.quit();
    });
    //header and navigation tests
    test("user can navigate to the main page via the logo", async () => {
      await demoblaze.click(demoblaze.cart);
      // pause to allow website to catch up with the test
      await driver.sleep(500);
      await demoblaze.click(demoblaze.logo);
      // pause to allow website to catch up with the test
      await driver.sleep(500);
      //Verify you are on the home page.
      expect(await driver.getCurrentUrl()).toEqual(demoblaze.url);
    });
    test("user can navigate to the main page via the home header", async() => {
      await demoblaze.click(demoblaze.cart);
      // pause to allow website to catch up with the test
      await driver.sleep(500);
      await demoblaze.click(demoblaze.home);
      // pause to allow website to catch up with the test
      await driver.sleep(500);
      //Verify you are on the home page.
      expect(await driver.getCurrentUrl()).toEqual(demoblaze.url);
    });
    test("user can send a message via contact", async() => {
      // you should't be able to send blank messages
    });
    test("user can watch the about us video",  async() => {});
    // determine if this out of scope
    test("user can pause the about us video", async() => {});
    test("user can close out of the about us modal (ie. popup)", async() => {});
    //main page tests
    test("the carosel will stop sliding if the user's mouse is hovering over it", async() => {});
    test("user can navigate to a product page from the main page", async() => {
      await demoblaze.click(By.xpath("//a[@href='prod.html?idp_=1']"));
      expect(await driver.getCurrentUrl()).toEqual("https://www.demoblaze.com/prod.html?idp_=1");
    });
    test("user can filter categories", async() => {});
    test("user can select previous and next buttons", async() => {
      //expect the main page to show the "first product page" (however you can select previous)
    });
    // product and cart tests
    test("user can add a product to the cart", async() => {});
    test("user can add multiple products to the cart", async() => {});
    test("the products remain in the cart after navigating away ", async() => {});
    test("user can remove a product from the cart", async() => {});
    test("user can place an order", async() => {
      // with empty inputs
      // with only 1 input filled out
      // with all fields filled out
      // with only name and credit card fields filled out
    });
    // sign up/in/out
    test("user can sign up", async() => {});
    test("user cannot sign up if the username has already been taken", async() => {});
    test("user can sign in", async() => {});
    test("user can sign out", async() => {});

  })