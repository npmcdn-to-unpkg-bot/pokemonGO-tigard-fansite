let express = require('express');
let router = express.Router();
let CalendarEvent = require('../models/calendar-event');
let Calendar = require('../models/calendar');
/**
 * Gets the calendar data object 
 */
router.get('/', function(res, req, next) {
    new Calendar().fetchAll()
    .then(function(calendar) {
        res.send(articles.toJSON());
    }).catch(function(er) {
        res.send("This calendar GET escaped! " + er);
    }) 
})
/**
 * Saves a new CalendarEvent to the db
 * 
 * @param {req} body
 * 
 */
router.post('/', function(res, req, next) {
    new CalendarEvent({
        // set body vals to model vals
        
    }).save().then(function(){
        // 200 OK

    }).catch(function(er){
        res.send('calendar error ' + er);
    })
});