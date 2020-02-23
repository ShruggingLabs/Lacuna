const puppeteer = require("puppeteer")
const fs = require("fs")

const prepareProductsPage = async (context) => {
  const selectors = {
    productLinks: ".entry-featured-image-url"
  }

  const getProductLinkElements = async () => {
    return await context.page.$$(selectors.productLinks)
  }

  const getProductHref = async (productLinkElement) => {
    return await productLinkElement.evaluate((node) => node.getAttribute("href"))
  }

  const getProductsHrefs = async () => {
    const productLinkElements = await getProductLinkElements()
    return await Promise.all(productLinkElements.map(getProductHref))
  }

  return {
    selectors,
    getProductLinkElements,
    getProductHref,
    getProductsHrefs
  }
}

const prepareProductPage = async (context) => {
  const selectors = {
    tastyImage: ".et_pb_slide",
    productTitle: ".et_pb_slide_title",
    productImage: "body .et_pb_image_wrap:first-of-type img",
    nutritionFactsImage: "body .et_pb_image_wrap:last-of-type img",
    ingredientsText: ".et-last-child h4",
    productDescription: "body p:first-of-type"
  }

  const getProductTitle = async () => {
    const element = await context.page.$(selectors.productTitle)
    return await element.evaluate((node) => node.innerText)
  }

  const getTastyImage = async () => {
    const element = await context.page.$(selectors.tastyImage)

    return await element.evaluate((node) => {
      const computedStyle = window.getComputedStyle(node)
      const backgroundImageValue = computedStyle.getPropertyValue("background-image")
      return backgroundImageValue.replace('url("', "").replace('")', "")
    })
  }

  const getProductImage = async () => {
    const element = await context.page.$(selectors.productImage)
    return await element.evaluate((node) => node.getAttribute("src"))
  }

  const getNutritionFactsImage = async () => {
    const element = await context.page.$(selectors.nutritionFactsImage)
    return await element.evaluate((node) => node.getAttribute("src"))
  }

  const getIngredientsText = async () => {
    const element = await context.page.$(selectors.ingredientsText)
    return await element.evaluate((node) => node.innerText)
  }

  const getProductDescription = async () => {
    const element = await context.page.$(selectors.productDescription)
    return await element.evaluate((node) => node.innerText)
  }

  return {
    selectors,
    getProductTitle,
    getTastyImage,
    getProductImage,
    getNutritionFactsImage,
    getIngredientsText,
    getProductDescription
  }
}

const STARTING_URL = "https://pedersonsfarms.com/products/"

const main = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const context = { browser, page }
  await page.goto(STARTING_URL)

  const productsPage = await prepareProductsPage(context)
  const productHrefs = await productsPage.getProductsHrefs()

  const products = []

  for (const productHref of productHrefs) {
    await page.goto(productHref)
    // const context = { page, browser }

    const productPage = await prepareProductPage(context)
    const productTitle = await productPage.getProductTitle()
    const tastyImage = await productPage.getTastyImage()
    const productImage = await productPage.getProductImage()
    const nutritionFactsImage = await productPage.getNutritionFactsImage()
    const ingredientsText = await productPage.getIngredientsText()
    const productDescription = await productPage.getProductDescription()

    const product = {
      productTitle,
      tastyImage,
      productImage,
      nutritionFactsImage,
      ingredientsText,
      productDescription
    }

    console.log(product)
    products.push(product)
  }

  fs.writeFileSync("./products.json", JSON.stringify({ products }, null, 2), "utf8")

  await browser.close()
}

main()

const asyncMap = async (target, handler) => {
  return new Promise((resolve) => {
    const final = target.map(handler)
    resolve(Promise.all(final))
  })
}
