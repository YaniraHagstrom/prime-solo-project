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
            res.send('Error in GET /location', dbErr);
        })
})

router.get('/cities/:id', (req, res)=> {
    const country_id = req.params.id;
    console.log(country_id);
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
            res.send('Error in GET /location', dbErr);
        })
})

router.post('/', (req, res)=> {
    const userCountry = req.body.country_id;
    const userCity=req.body.city_id
    console.log(req.body);

    // const sqlQuery = 
    // `SELECT * FROM city
    //     WHERE country_id = $1
    // ;`
    // const sqlValues= [country_id]
    // pool.query(sqlQuery, sqlValues)
    //     .then(dbRes => {
    //         res.send(dbRes.rows);
    //     })
    //     .catch(dbErr=> {
    //         res.send('Error in GET /location', dbErr);
    //     })
})





module.exports = router;