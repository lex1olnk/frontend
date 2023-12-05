const puppeteer = require('puppeteer');

const url = 'https://www.worldometers.info/undernourishment/';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Ждем, пока данные загрузятся (может потребоваться настроить время ожидания)
  await page.waitForSelector('.maincounter-number');

  // Извлекаем элементы с классом "maincounter-number"
  const mainCounterElements = await page.$$('.maincounter-number');

  // Итерируемся по найденным элементам и извлекаем данные
  for (const element of mainCounterElements) {
    const text = await (await element.getProperty('textContent')).jsonValue();
    console.log(text.trim());
  }

  await browser.close();
})();
