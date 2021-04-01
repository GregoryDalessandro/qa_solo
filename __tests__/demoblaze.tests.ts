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
    // navigate to main page
    beforeEach(async () => {
      await driver.get(demoblaze.url);
    });
    // ensure each test will start in a clean state
    afterEach(async() => {
      await driver.manage().deleteAllCookies();
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
    // test("user can filter categories", async() => {
    //   let phones = ["Samsung galaxy s6", "Nokia lumia 1520", "Nexus 6", "Samsung galaxy s7", "Iphone 6 32gb", "Sony xperia z5", "HTC One M9"]
    //   // let laptops = ["Sony vaio i5", "Sony vaio i7", "MacBook air", "Dell i7 8gb", "2017 Dell 15.6 Inch", "MacBook Pro"];
    //   // let monitors = ["Apple monitor 24", "ASUS Full HD"];
    //   // filter phones
    //   await demoblaze.click(By.xpath("//a[contains(text(),'Phones')]"));
    //   // expect there to only be phones

    //   let hardCodedFilteredBodyElements = [
    //     await demoblaze.getText(By.xpath("//a[contains(text(),'Samsung galaxy s6')]")),
    //     await demoblaze.getText(By.xpath("//a[contains(text(),'Nokia lumia 1520')]")),
    //     await demoblaze.getText(By.xpath("//a[contains(text(),'Nexus 6')]")),
    //     await demoblaze.getText(By.xpath("//a[contains(text(),'Samsung galaxy s7')]")),
    //     await demoblaze.getText(By.xpath("//a[contains(text(),'Iphone 6 32gb')]")),
    //     await demoblaze.getText(By.xpath("//a[contains(text(),'Sony xperia z5)]")),
    //     await demoblaze.getText(By.xpath("//a[contains(text(),'HTC One M9)]"))
    //   ];
    //   for (let i=0, j=0; i < phones.length, j < hardCodedFilteredBodyElements.length; i++, j++) {
    //     // console.log(hardCodedFilteredBodyElements[j]);
    //     expect(phones[i]).toContain(hardCodedFilteredBodyElements[j])
    //   }

    //   // expect body to contain each of the products in phones

    //   // click laptops
    //   // expect there to be only laptops
    //   // click monitors
    //   // expect there to be only monitors
    // });
    test("user can select previous and next buttons", async() => {
      //expect the main page to show the "first product page" (however you can select previous)
    });
    // product and cart tests
    test("user can add a product to the cart", async() => {
      // navigate to a product page, add to cart, then navigate to cart
      await demoblazeProduct.click(By.xpath("//a[contains(text(), 'Samsung galaxy s6')]"));
      await demoblazeProduct.addToCart();
      // wait for the alert to show up
      await driver.wait(until.alertIsPresent());
      let alert = await driver.switchTo().alert();
      await alert.accept();
      await demoblazeProduct.click(demoblazeProduct.cart);
      //expect the product to be in the cart
      expect(await demoblazeProduct.getElement(By.css(".success"))).toBeTruthy();
    });
    test("user can add multiple products to the cart", async() => {});
    test("the products remain in the cart after navigating away", async() => {
      // navigate to a product page, add to cart, then navigate to cart
      await demoblazeProduct.click(By.xpath("//a[contains(text(), 'Samsung galaxy s6')]"));
      await demoblazeProduct.addToCart();
      // wait for the alert to show up, then close it by accepting
      await driver.wait(until.alertIsPresent());
      let alert = await driver.switchTo().alert();
      await alert.accept();
      await demoblazeProduct.click(demoblazeProduct.cart);
      await driver.sleep(500);
      // compare cart before and after navigating away
      let cartBeforeNavigation = await demoblazeProduct.driver.findElements(By.xpath("//tr[@class='success']"));
      await demoblazeProduct.click(demoblazeProduct.home);
      // await driver.sleep(500);
      await demoblazeProduct.click(demoblazeProduct.cart);
      await driver.sleep(500);
      let cartAfterNavigation = await demoblazeProduct.driver.findElements(By.xpath("//tr[@class='success']"));
      expect(cartBeforeNavigation.length).toEqual(cartAfterNavigation.length);
    });
    test("user can remove a product from the cart", async() => {
      // navigate to a product page, add to cart, then navigate to cart
      await demoblazeProduct.click(By.xpath("//a[contains(text(), 'Samsung galaxy s6')]"));
      await demoblazeProduct.addToCart();
      // wait for the alert to show up, then close it by accepting
      await driver.wait(until.alertIsPresent());
      let alert = await driver.switchTo().alert();
      await alert.accept();
      await demoblazeProduct.click(demoblazeProduct.cart);
      await driver.sleep(500);
      // compare cart before and after removal
      let cartBeforeRemoval = await demoblazeProduct.driver.findElements(By.xpath("//tr[@class='success']"));
      await demoblazeProduct.click(By.xpath("//a[contains(text(),'Delete')]"));
      await driver.sleep(500);
      let cartAfterRemoval = await demoblazeProduct.driver.findElements(By.xpath("//tr[@class='success']"));
      //expect the product to no longer be in the cart
      expect(cartBeforeRemoval.length > cartAfterRemoval.length && cartAfterRemoval.length === 0).toBeTruthy();
    });
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