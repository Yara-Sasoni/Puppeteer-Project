const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10,
            devtools: false,
            args: ['--start maximized']
        })
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    
    })

    after(async function() {
        await browser.close()
    })
   
    it('Desktop Device Test', async function() {
        //await setViewport({width:1650, height: 1050})
        await page.goto('https://example.com')
        await page.waitForTimeout(5000)
    })

    it('Tablet Device Test', async function() {
        const tablet = puppeteer.devices['iPad landscape'] //this will set the the viewport of puppeteer to match the tablet screen resolution 
        await page.emulate(tablet)
        await page.goto('https://example.com')
        await page.waitForTimeout(5000)
    })

    it('Mobile Device Test', async function() {
        const mobile = puppeteer.devices['Galaxy S5']
        await page.emulate(mobile)
        await page.goto('https://example.com')
        await page.waitForTimeout(5000)
    })



})