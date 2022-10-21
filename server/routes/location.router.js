const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/countries', (req, res)=> {
    const sqlQuery = 
    `SELECT * FROM country;`

    pool.query(sqlQuery)
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(dbErr=> {
            res.send('Error in GET /location/countries', dbErr);
        })
})

router.get('/cities/:id', (req, res)=> {
    const country_id = req.params.id;
    // console.log(country_id);
    const sqlQuery = 
    `SELECT * FROM city
        WHERE country_id = $1
    ;`
    const sqlValues= [country_id]
    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(dbErr=> {
            console.log('Error in GET /location/cities', dbErr);
            res.sendStatus(500)
        })
})

router.put('/', (req, res)=> {
    const {country_id, city_id} = req.body;
    const userID = req.user.id;
    const sqlQuery = 
        `UPDATE "user"
            SET 
                country_id = $1,
                city_id = $2
            WHERE id = $3
        ;`
    const sqlValues= [country_id, city_id, userID];
    pool.query(sqlQuery, sqlValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch(dbErr=> {
            res.sendStatus(500);
            console.log('Error in PUT /location', dbErr);
        })
})

module.exports = router;