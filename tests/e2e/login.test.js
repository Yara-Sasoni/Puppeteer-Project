const puppeteer = require('puppeteer')

describe('login Test', () => {
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
    it('Login Test - Invalid Credentials', async function() {
        await page.goto('http://zero.webappsecurity.com')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'invalid creds' )
        await page.type('#user_password', 'invalid password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        await page.waitForSelector('.alert-error')
    
    })

    it('Login Test - Valid Credentials', async function() {
        await page.goto('http://zero.webappsecurity.com')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username' )
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        await page.goBack()
        await page.waitForSelector('#settingsBox')
    })
})

