var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/**
 * SEARCH & FILTERS
 */
router.get("/search?:query", function (req, res, next) {
    const query = decodeURI(req.url).split("?")[1];
    var filter = query.split("&"); //split filter using & (ex: search?offence=arson&area=winton)
    var numFilters = 0;
    var data = [];
    var column = req.query.offence.split(" ").join("").toLowerCase();


    //Show error if token is not match with login token

    try {
        const token_auth = req.headers.authorization;
        var newToken = token_auth.replace("Bearer ", "");
        var decoded = jwt.verify(newToken, 'shhhhh');
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            "error": true,
            "message": "oops! it looks like you're missing the authorization header"
        })
    }
    //loop through every filters 
    for (i of filter) {
        ++numFilters;
    }

    //push data into array
    var values = [];
    var filterArray = [];
    var varArray = [];
    for (var i = 0; i < numFilters; i++) {
        values.push([]);
        filterArray.push([]);
        varArray.push([]);
    }

    for (var i = 0; i < numFilters; i++) {
        var filterQuery = filter[i];
        varArray[i] = filterQuery.split('=');
        filterArray[i] = varArray[i][0];
        values[i] = varArray[i][1].split(',');
    }

    if (numFilters == 1) {
        req.db
            .from('offences')
            .select('offences.area as LGA')
            .sum(`${column} as total`)
            .select('areas.lat', 'areas.lng')
            .join('areas', 'areas.area', '=', 'offences.area')
            .groupBy('offences.area')
            .then((rows) => {
                res.status(200).json({
                    "query": req.query,
                    "result": rows
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ "message": "oops! it looks like you're missing the offence query parm" })
            })

    } else if (numFilters == 2) {
        req.db
        req.db
            .from('offences')
            .select('offences.area as LGA')
            .where(filterArray[1], 'IN', values[1])
            .sum(`${column} as total`)
            .select('areas.lat', 'areas.lng')
            .join('areas', 'areas.area', '=', 'offences.area')
            .groupBy('offences.area')
            .then((rows) => {
                res.status(200).json({
                    "query": req.query,
                    "result": rows
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ "message": "oops! it looks like you're missing the offence query parm" })
            })
    } else if (numFilters == 3) {
        req.db
            .from('offences')
            .select('offences.area as LGA')
            .where(filterArray[1], 'IN', values[1])
            .where(filterArray[2], 'IN', values[2])
            .sum(`${column} as total`)
            .select('areas.lat', 'areas.lng')
            .join('areas', 'areas.area', '=', 'offences.area')
            .groupBy('offences.area')
            .then((rows) => {
                res.status(200).json({
                    "query": req.query,
                    "result": rows
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ "message": "oops! it looks like you're missing the offence query parm" })
            })
    } else if (numFilters == 4) {
        req.db
            .from('offences')
            .select('offences.area as LGA')
            .where(filterArray[1], 'IN', values[1])
            .where(filterArray[2], 'IN', values[2])
            .where(filterArray[3], 'IN', values[3])
            .sum(`${column} as total`)
            .select('areas.lat', 'areas.lng')
            .join('areas', 'areas.area', '=', 'offences.area')
            .groupBy('offences.area')
            .then((rows) => {
                res.status(200).json({
                    "query": req.query,
                    "result": rows
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ "message": "oops! it looks like you're missing the offence query parm" })
            })
    } else if (numFilters == 5) {
        req.db
            .from('offences')
            .select('offences.area as LGA')
            .where(filterArray[1], 'IN', values[1])
            .where(filterArray[2], 'IN', values[2])
            .where(filterArray[3], 'IN', values[3])
            .where(filterArray[4], 'IN', values[4])
            .sum(`${column} as total`)
            .select('areas.lat', 'areas.lng')
            .join('areas', 'areas.area', '=', 'offences.area')
            .groupBy('offences.area')
            .then((rows) => {
                res.status(200).json({
                    "query": req.query,
                    "result": rows
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ "message": "oops! it looks like you're missing the offence query parm" })
            })
    } else if (numFilters == 6) {
        req.db
            .from('offences')
            .select('offences.area as LGA')
            .where(filterArray[1], 'IN', values[1])
            .where(filterArray[2], 'IN', values[2])
            .where(filterArray[3], 'IN', values[3])
            .where(filterArray[4], 'IN', values[4])
            .where(filterArray[5], 'IN', values[5])
            .sum(`${column} as total`)
            .select('areas.lat', 'areas.lng')
            .join('areas', 'areas.area', '=', 'offences.area')
            .groupBy('offences.area')
            .then((rows) => {
                res.status(200).json({
                    "query": req.query,
                    "result": rows
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ "message": "oops! it looks like you're missing the offence query parm" })
            })
    }
});

module.exports = router; 