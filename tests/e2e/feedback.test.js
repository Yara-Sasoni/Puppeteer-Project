const puppeteer =require('puppeteer')
const expect = require('chai').expect

describe('Feedback Test', () => {
    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch({
            headless: false,
            slowmo: 10,
            devtools: false,
            args: ['--start maximized']
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(20000)
        await page.setDefaultNavigationTimeout(30000)
    })

    after(async function() {
        await browser.close()
    })

    it('Display Feedback Form', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#feedback')
        await page.click('#feedback')

    })
    it('Submit feedback Form', async function() {
        await page.waitForSelector('form')
        await page.type('#name', 'name')
        await page.type('#email', 'test@gmail.com')
        await page.type('#subject', 'subject')
        await page.type('#comment', 'Just a message into the text area')
        await page.click('input[type="submit"]')
    })
    it('Display Results Page', async function() {
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('/sendFeedback.html')
    })
})