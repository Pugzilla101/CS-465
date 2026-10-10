
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Module 7: JWT authentication middleware
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

// Module 7: Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// GET all trips (public)
// POST a new trip (authentication required)
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

// GET a trip by code (public)
// UPDATE or DELETE a trip (authentication required)
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;
