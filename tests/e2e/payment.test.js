const puppeteer = require('puppeteer')

describe('Payment Test', () => {
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

    after(async function() {
        await browser.close()
    })
    it('Display Payment Form', async function() {
        await page.click('#onlineBankingMenu')
        await page.waitForSelector('#pay_bills_link')
        await page.click('#pay_bills_link')
        await page.waitForSelector('.board')
    })

    it('Make Payment', async function() {
        await page.select('#sp_payee', 'Apple')
        await page.select('#sp_account', 'Credit Card')
        await page.type('#sp_amount', '500')
        await page.type('#sp_date', '2020-03-18')
        await page.keyboard.press('Enter')
        await page.type('#sp_description', 'Payment for rent.')
        await page.click('#pay_saved_payees')
        await page.waitForSelector('#alert_content')
    })
})