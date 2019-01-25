const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.reddit.com/r/news/';

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    const newsHeadlines = [];
    $('a[href*="/r/news/comments"] > h2').each(function() {
      newsHeadlines.push({
        title: $(this).text(),
      });
    });

    console.log(newsHeadlines);
  })
  .catch(console.error);
