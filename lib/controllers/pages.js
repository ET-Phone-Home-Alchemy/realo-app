const { Router } = require('express');
const Filter = require('../models/Filter');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .get('/', (req, res) => {
    const carriers = ['att', 'boost', 'cricket', 'google', 'tmobile', 'uscellular', 'verizon'];
    res.render('home', { 
      carriers });
  })

  .get('/filters', ensureAuth, async(req, res) => {
    const filters = await Filter.getFiltersByUserId(req.user.userId);
    const listing = 'these are listings';
    res.render('filters', {
      filters,
      listing
    });
  })

  .get('/about-us', (req, res) => {
    res.render('about-us', { superman: 'this is how to pass in variables to the pug file to display' });
  })

  .get('/logout', async(req, res, next) => {
    try {
      res.clearCookie('session');
      res.redirect('/');
    } catch(error){
      next(error);
    }
  })

  .get('/login', (req, res) => {
    res.render('login', { superman: 'this is how to pass in variables to the pug file to display' });
  });
