const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const readFileLines = filename =>
      fs.readFileSync(filename)
        .toString('UTF8')
        .split('\r\n');

/*   Settings   */
const eUsername = ""; // username or e-mail of messenger acc.
const ePassword = ""; // password of messenger acc.
const accounts = readFileLines('accs-to-dm.txt'); // you have to write the accounts in .txt one after the other without putting "@"
const dmMessage = `Hi`; // you can write more than one line between two apostrophe
/*              */

console.log(`>>> Started processing for ${accounts.length} accounts.`);
(async () => {
   puppeteer.use(StealthPlugin());
   const browser = await puppeteer.launch({
      headless: false,
      args:[
         '--no-sandbox',
         '--disable-gpu',
         '--enable-webgl',
         '--window-size=1000,800']}); 

   console.log(">>> Chrome has opened.");
   const loginUrl = "https://www.messenger.com/";
   const groupUrl = "https://www.messenger.com/new";
   const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'; 
   const page = await browser.newPage();
   await page.setUserAgent(ua);
   await page
         .goto(loginUrl, { waitUntil: 'networkidle2' });
   await page.waitForSelector('input[type="text"]').then(() => page.waitForTimeout(1000));
   await page.type('input[type="text"]', eUsername, {delay: 100});
   await page.type('input[type="password"]', ePassword, {delay: 100});
   await page.waitForTimeout(500);
   await page.keyboard.press('Enter');
   await page.waitForTimeout(5000);
   
   async function banError0() {
      await console.log(`>>> Software stopped because the account's chat was restricted.`);
      await process.exit();};
   async function banError1() {
      await console.log(`>>> Software stopped because account locked.`);
      await process.exit();};

   await page.exposeFunction('accEvaluate', a => accounts[i]);
   await page.exposeFunction('banError', a => banError0());
   await page.exposeFunction('banError2', a => banError1());
   
   await page.evaluate(async () => {
      const elements = [...document.querySelectorAll('img')];
      const checkBan = elements.find(e => e.src == `https://static.xx.fbcdn.net/rsrc.php/y-/r/S8RO1gGmYHl.svg`);
      if (checkBan) await banError2(); });
   await page.waitForTimeout(500);
   
for (var i = 0; i < accounts.length; i++) {
      let x = i + 1;
      console.log(`(#${x}) Starting the process for @${accounts[i]}.`);

      await page.goto(groupUrl, { waitUntil: 'networkidle2' });
      await console.log(`(#${x}) New chat window has opened.`);

      await page.evaluate(async () => {
                  const elements = [...document.querySelectorAll('a')];
                  const checkBan = elements.find(e => e.href == `https://www.facebook.com/help/messenger-app/254699034734362?ref=block`);
                  if (checkBan) await window.banError(); });

      await page.waitForSelector('input[class="xjbqb8w x76ihet xwmqs3e x112ta8 xxxdfa6 x9f619 xzsf02u xt0psk2 x1jchvi3 x1fcty0u x132q4wb x1xmf6yo x1emribx x1e56ztr x1i64zmx x193iq5w x1a2a7pz xtt52l0 x1a8lsjc xo6swyp x1ad04t7 x1glnyev x1ix68h3 x19gujb8"]')
            .then(() => page.waitForTimeout(500));
      await page.type('input[class="xjbqb8w x76ihet xwmqs3e x112ta8 xxxdfa6 x9f619 xzsf02u xt0psk2 x1jchvi3 x1fcty0u x132q4wb x1xmf6yo x1emribx x1e56ztr x1i64zmx x193iq5w x1a2a7pz xtt52l0 x1a8lsjc xo6swyp x1ad04t7 x1glnyev x1ix68h3 x19gujb8"]', accounts[i]);
      await console.log(`(#${x}) @${accounts[i]} typed in search box.`);

      await page.waitForSelector('span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1xlr1w8 xi81zsa"]')
            .then(() => page.waitForTimeout(500));
      await page.evaluate(async () => {
                  const accEvaluate2 = await window.accEvaluate();
                  const elements = [...document.querySelectorAll('span')];
                  const targetElement = elements.find(e => e.innerText == `${accEvaluate2}`);
                  if (targetElement) targetElement.click();})
            .then(() => page.waitForTimeout(1000));
      await console.log(`(#${x}) @${accounts[i]} selected for DM.`);
      
      await page.waitForSelector('div[class="x78zum5 x1iyjqo2 x1gja9t x16n37ib x1xmf6yo x1e56ztr xeuugli x1n2onr6"]')
            .then(() => page.waitForTimeout(500));
      await page.click('div[class="x78zum5 x1iyjqo2 x1gja9t x16n37ib x1xmf6yo x1e56ztr xeuugli x1n2onr6"]')
            .then(() => page.waitForTimeout(500));
      await page.keyboard.sendCharacter(dmMessage)
            .then(() => page.waitForTimeout(500));
      await page.keyboard.press('Enter');
      await console.log(`(#${x}) DM message sent to @${accounts[i]}.`);
	if (x < accounts.length) { await console.log(`(#${x} --> ${x+1})`); };
      await page.waitForTimeout(1500);
}; 

await console.log(`>>> ${accounts.length} accounts have been processed.`);

})();