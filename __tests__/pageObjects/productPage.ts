import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement
} from "selenium-webdriver";
import {BasePage} from "./BasePage";

export class ProductPage extends BasePage {
  addToCartBtn: By = By.xpath("//a[contains(text(), 'Add to cart')]");
  constructor(driver:WebDriver) {
    super(driver);
  }
  //add a product to the cart
  async addToCart() {
    await this.click(this.addToCartBtn);
  }
}