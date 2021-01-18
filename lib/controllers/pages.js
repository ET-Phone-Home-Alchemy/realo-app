const { Router } = require('express');

module.exports = Router()
  .get('/', (req, res, next) => {
    res.render('home', { superman: 'this is how to pass in variables to the pug file to display' });
  })

  .get('/filters', (req, res, next) => {
    res.render('filters', { superman: 'this is how to pass in variables to the pug file to display' });
  })

  .get('/about-us', (req, res, next) => {
    res.render('about-us', { superman: 'this is how to pass in variables to the pug file to display' });
  });
