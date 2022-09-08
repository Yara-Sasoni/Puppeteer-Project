const puppeteer = require('puppeteer') //gives us access to everything inside puppeteer package
const expect = require('chai').expect

const { click, getCount, getText, shouldNotExist } = require('../lib/helpers')

describe('My First Puppeteer Test  ',  () => { //a wrapper around test steps or test suite
//inside describe we can create as many test steps as we want
    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch({ 
            headless: false,
            slowMo: 10,
            devtools: false,
            defaultViewport: null,
            args: ['--start-maximized'] //to maximize the window of the browser
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })
    after(async function(){
        await browser.close()
    })

    it('should launch the browser', async function() { //Describes a specification or test case with the given title and call back function acting as thunk 
        await page.goto('http://example.com') //this way we are telling the page to visit this URL\
        await page.waitForXPath('//h1')
        const title = await page.title()
        const url = page.url()
        //const text = await page.$eval('h1', Element => Element.textContent) //to specify what we want to return, in this case the text in h1 (we use eval to extract content from element)
        //const count = await page.$$eval('p', Element => Element.length) //how many paragraphs are on the page
        const text = await getText(page, 'h1')
        const count = await getCount(page, 'p')
        
        expect(title).to.be.a('string', 'Example Domain')
        expect(url).to.include('example.com')
        expect(text).to.be.a('string', 'example domain')
        expect(count).to.equal(2)

        await page.goto('http://zero.webappsecurity.com/')
        //await page.waitForSelector('#signin_button')
        //await page.click('#signin_button')
        await click(page, '#signin_button')
        //await page.waitForSelector('#signin_button', { //reverses the effect of waitfor selector so that we wait for it to disappear not appear
            //hidden: true, 
            //timeout: 3000,
        //})
        //to run this code we need to create a test command in test in the package JSON (node ./node_modules/mocha/bin/mocha --timeout=30000 ./tests)
        await page.waitForTimeout(2000)
        await shouldNotExist(page, '#signin_button')

    })
     
 })
