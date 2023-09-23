const https = require('https');
//To scrape, I have used following URL
const url = 'https://time.com/';
// I am sending HTTP GET request here.
function dataScrapping() {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      // Here, it is reading the response data
      response.on('data', (chunk) => {
        data += chunk;
      });
      // When the respond ends, it is processing the data
      response.on('end', () => {
        if (response.statusCode === 200) {
          // Processing the HTML content and resolving the promise with the articles
          const articles = Extraction(data);
          resolve(articles);
        } else {
          console.log('Failed to retrieve web page.');
          reject(new Error('Failed to retrieve web page.'));
        }
      });
    }).on('error', (error) => {
      console.error('Error:', error);
      reject(error);
    });
  });
}
function Extraction(html) {
  const regex = /<li class="latest-stories__item">\s*<a\s+href="([^"]+)">\s*<h3 class="latest-stories__item-headline">([^<]+)<\/h3>/g;
  let match;
  const answer = [];
  while ((match = regex.exec(html)) !== null) {
    const title = match[2];
    const link = "https://time.com" + match[1];
    answer.push({ title, link });
  }
  return answer;
}
module.exports = {
    dataScrapping,
};