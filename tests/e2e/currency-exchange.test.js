const puppeteer = require('puppeteer')

describe('Currency Exchange Test', () => {
    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch({
            headless: true,
            slowmo: 10,
            devtools: false,
            args: ['--start maximized']
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(20000)
        await page.setDefaultNavigationTimeout(30000)

        await page.goto('http://zero.webappsecurity.com/login.html')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username' )
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        await page.goBack()
        await page.waitForSelector('#settingsBox')
        
    })
    it('Display Currency Exchange Form', async function() {
        await page.click('#onlineBankingMenu')
        await page.waitForSelector('#pay_bills_link')
        await page.click('#pay_bills_link')
        await page.waitForSelector('#tabs > ul > li:nth-child(3) > a')
        await page.click('#tabs > ul > li:nth-child(3) > a')
        await page.waitForSelector('.board')
    })

    it('Exchange Currency', async function() {
        await page.select('#pc_currency', 'DKK' )
        await page.type('#pc_amount', '800')
        await page.click('#pc_inDollars_true')
        await page.click('#purchase_cash')
        await page.waitForSelector('#alert_content')
    })
})