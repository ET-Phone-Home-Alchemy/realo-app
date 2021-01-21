const { Router } = require('express');
const Filter = require('../models/Filter');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .get('/', (req, res) => {
    res.render('home', { superman: 'this is how to pass in variables to the pug file to display' });

  })

  .get('/filters', ensureAuth, async(req, res) => {
    const filters = await Filter.getFiltersByUserId(req.user.userId);
    res.render('filters', {
      filters
    });
  })

  .get('/about-us', (req, res) => {
    res.render('about-us', { superman: 'this is how to pass in variables to the pug file to display' });
  })
  
  .get('/signup', (req, res) => {
    const carriers = ['att', 'boost', 'cricket', 'google', 'tmobile', 'uscellular', 'verizon'];
    res.render('signup', { 
      carriers });

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
    res.render('login');
    return res.redirect('/filters');
  });
