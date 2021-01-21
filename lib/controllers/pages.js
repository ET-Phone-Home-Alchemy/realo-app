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
    //Need to setup user number based on user that is logged in but not sure how. This is to make sure that only returning filters belonging to user.
    // const userId = 1;
    //req.user.userId is only going to work after log in is successful
    // req.user will have this example data{
    //   userId: '1',
    //   name: 'Joan Arbuckle',
    //   email: 'test1@test.com',
    //   phoneNumber: '1235679876',
    //   carrier: 'att'
    // }
    
    const filters = await Filter.getFiltersByUserId(req.user.userId); //This function will break everything if no filters in the database.
    //Leaving this example in here to show second variable passed in
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
