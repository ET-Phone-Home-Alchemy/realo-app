const { Router } = require('express');

module.exports = Router()
  .get('/', (req, res, next) => {
    const carriers = ['Alltel', 'AT&T', 'T-Mobile', 'VirginMobile', 'Sprint', 'Verizon', 'Nextel', 'US-Cellular'];

    res.render('home', { 
      carriers });
  })

  .get('/filters', (req, res, next) => {
    res.render('filters', { superman: 'this is how to pass in variables to the pug file to display' });
  })

  .get('/about-us', (req, res, next) => {
    res.render('about-us', { superman: 'this is how to pass in variables to the pug file to display' });
  });
