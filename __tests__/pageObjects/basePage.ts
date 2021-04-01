import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement
} from "selenium-webdriver";
const chromedriver = require("chromedriver");
const fs = require("fs");

export class BasePage {
  driver: WebDriver;
  url: string = "https://www.demoblaze.com/index.html";
  logo: By = By.id("nava");
  home: By = By.xpath("//a[contains(text(), 'Home')]");
  contact: By = By.xpath("//a[contains(text(), 'Contact')]");
  aboutUs: By = By.xpath("//a[contains(text(), 'About us')]");
  cart: By = By.xpath("//a[contains(text(), 'Cart')]");
  signUp: By = By.id("signin2");
  logIn: By = By.id("login2");
  logOut: By = By.id("logout");

  constructor(driver) {
    this.driver = driver;
  }
  /**
   * wait for the element to be located and become visible before returning it.
   * @param {By} elementBy - the locator for the element to return
   */
  async getElement(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    let element = await this.driver.findElement(elementBy);
    await this.driver.wait(until.elementIsVisible(element));
    return element;
  }
  /**
   * click on the given element after it becomes enabled
   * @param {By} elementBy - the locator for the element to click on
   */
  async click(elementBy: By) {
    let element = await this.getElement(elementBy);
    await this.driver.wait(until.elementIsEnabled(element));
    return await element.click();
  }
/**
 * clears the given element waiting for it to become enabled, then sends the provided keys
 * @param {By} elementBy - the locator of the element to clear and then send text to
 * @param {string} keys - the string that is being sent
 */
  async inputText(elementBy: By, keys: string) {
    let input = await this.getElement(elementBy);
    await  this.driver.wait(until.elementIsEnabled(input));
    await input.clear();
    return input.sendKeys(keys);
  }
  /**
   * create an account with the provided keys as the inputs, then click the Sign Up button
   * @param {string} username - the string that is being sent for the username input field
   * @param {string} password - the string that is being sent for the password input field
   */
  async createAccount (username: string, password: string) {
    await this.click(this.signUp);
    await this.inputText(By.id("sign-username"), username);
    await this.inputText(By.id("sign-password"), password);
    await this.click(By.xpath("//button[contains(text(), 'Sign up')]"));
  }
  /**
   * log into the account with provided keys, then click the Log In button
   * @param {string} username - the string that is being sent for the username input field
   * @param {string} password - the string that is being sent for the password input field
   */
  async signIn(username: string, password: string) {
    await this.click(this.logIn);
    await this.inputText(By.id("loginusername"), username);
    await this.inputText(By.id("loginpassword"), password);
    await this.click(By.xpath("//button[contains(text(), 'Log in')]"));
  }
  // sign out of the account
  async signOut() {
    await this.click(this.logOut);
  }
/**
 * Will automatically take a screenshot and save it to the filepath/filename provided
 * Automatically saves as a .png file.
 * @param {string} filepath - the filepath relative to the base folder where you want the screenshot saved
 * @example
 * page.takeScreenshot("myFolder/mypic")
 * // picture saves in "myFolder" as mypic.png"
*/
  async takeScreenshot(filepath: string) {
    fs.writeFile(
      `${filepath}.png`,
      await this.driver.takeScreenshot(),
      "base64",
      (e) => {
        if (e) console.log(e);
        else console.log("screenshot saved successfullly");
      }
    );
  }
}

