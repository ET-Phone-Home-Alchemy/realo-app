const request = require('superagent');

request.get('https://www.zillow.com/portland-or/1-1_beds/2_p/?searchQueryState=%7B%22pagination%22%3A%7B%22currentPage%22%3A1%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-124.30244448828125%2C%22east%22%3A-121.08894351171875%2C%22south%22%3A44.77891038746072%2C%22north%22%3A46.32132614063067%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A13373%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22beds%22%3A%7B%22min%22%3A0%2C%22max%22%3A0%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A9%7D')
  .then(res => console.log(res.text));
