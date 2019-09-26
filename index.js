const puppeteer = require('puppeteer');
const gs = require('ghostscript4js');
const argv = require('minimist')(process.argv.slice(2));

(async () => {
  // 헤드리스 브라우저로 띄우기 - puppeteer
  try {
    console.log("---- puppeteer Start -----")
    const browser = await puppeteer.launch(
      {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
      );
    const page = await browser.newPage();
    const URL = argv.URL || 'https://seunghyum.github.io/about';
    await page.setViewport({ width: 1920, height: 1080 });
    await page.emulateMedia('screen')
    await page.goto(URL, {waitUntil: 'networkidle2', timeout: 0});
    const height = await page.evaluate(() => document.documentElement.offsetHeight + 100);
    await page.pdf({path: './outputs/result_raw.pdf',width: '1720px', height: height + 'px', printBackground: true});
    await browser.close();
    console.log("---- puppeteer End -----")
  } catch(err) {
    console.log("Puppeteer get something wrong")
    throw err
  }

  // 압축 - Ghostscript
  try {
    console.log("---- Ghostscript Start -----")
    const cmd = `ghostscript \ 
                  -sDEVICE=pdfwrite \
                  -dCompatibilityLevel=1.4 \
                  -dPDFSETTINGS=/ebook \
                  -dNOPAUSE \
                  -dQUIET \
                  -dBATCH \
                  -sOutputFile=./outputs/result.pdf ./outputs/result_raw.pdf`

    await gs.executeSync(cmd)
    console.log("---- Ghostscript End -----")
  } catch(err) {
    console.log("Ghostscript get something wrong")
    throw err
  }
  console.log(`
    --완료-- \n
    outputs폴더의 result.pdf를 확인해주세요.
  `)
})();