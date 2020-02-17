const puppeteer = require("puppeteer")
;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto("http://localhost:3000/projects/2Ful8McNxcefAlD23AjrMh/preview")
  await page.waitFor(3000)
  await page.emulateMedia("screen")
  const pdf = await page.pdf({ path: "PDF.pdf", width: "816px", height: "1056px", scale: 1 })

  await browser.close()
})()
