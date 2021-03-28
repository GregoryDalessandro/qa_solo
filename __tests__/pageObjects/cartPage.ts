import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement
} from "selenium-webdriver";
import {BasePage} from "./basePage";

export class CartPage extends BasePage {
  placeOrderBtn: By = By.xpath("//button[contains(text(), 'Place Order')]");
  nameInput: By = By.id("name");
  countryInput: By = By.id("country");
  cityInput: By = By.id("city");
  creditCardInput: By = By.id("card");
  monthInput: By = By.id("month");
  yearInput: By = By.id("year");
  xSpan: By = By.xpath("//span[contains(text(), 'x')]");
  closeBtn: By = By.xpath("//button[contains(text(), 'Close')]");
  purchaseBtn: By = By.xpath("//button[contains(text(), 'Purchase')]");
  constructor(driver:WebDriver) {
    super(driver);
  }
  // select the place order button to navigate to the Place order pop up
  async placeOrder() {
    await this.click(this.placeOrderBtn);
  }
  /**
   * place an order, provide credit card information with the given keys, then the click the purchase button
   * @param name - the string being sent for the name input field
   * @param country - the string being sent for the country input field
   * @param city - the string being sent for the city input field
   * @param cc - the string being sent for the credit card input field
   * @param month - the string being sent for the month input field
   * @param year - the string being sent for the year input field
   */
  async purchase(name: string, country: string, city: string, cc: string, month: string, year: string) {
    await this.placeOrder();
    await this.inputText(this.nameInput, name);
    await this.inputText(this.countryInput, country);
    await this.inputText(this.cityInput, city);
    await this.inputText(this.creditCardInput, cc);
    await this.inputText(this.monthInput, month);
    await this.inputText(this.yearInput, year);
    await this.click(this.purchaseBtn);
  }
  /**
   * close the place order window via the argument given
   * @param elementBy - the element to click to navigate out of the place order window
   */
  async cancelPurchase(elementBy: By) {
    await this.click(elementBy);
  }
  /**
   * remove a product from the cart via the argument given
   * @param elementBy - the element being clicked to remove the product from the cart
   */
  async removeFromCart(elementBy: By) {
    await this.click(elementBy);
  }
}