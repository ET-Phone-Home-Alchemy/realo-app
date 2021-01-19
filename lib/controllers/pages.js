const { Router } = require('express');
const Filter = require('../models/Filter');

module.exports = Router()
  .get('/', (req, res, next) => {
    res.render('home', { superman: 'this is how to pass in variables to the pug file to display' });
  })

  .get('/filters', async (req, res, next) => {
    //Need to setup user number based on user that is logged in but not sure how. This is to make sure that only returning filters belonging to user.
    const userId = 1;
    //req.user.userId is only going to work after log in is successful
    // req.user will have this example data{
    //   userId: '1',
    //   name: 'Joan Arbuckle',
    //   email: 'test1@test.com',
    //   phoneNumber: '1235679876',
    //   carrier: 'att'
    // }
    const userAfterEnsureAuth = req.user?.userId;
    const filters = await Filter.getFiltersByUserId(userAfterEnsureAuth || userId);
    //Leaving this example in here to show second variable passed in
    const listing = 'these are listings';
    res.render('filters', {
      filters,
      listing
    });
  })

  .get('/about-us', (req, res, next) => {
    res.render('about-us', { superman: 'this is how to pass in variables to the pug file to display' });
  });
