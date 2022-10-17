const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res)=> {
    const sqlQuery=`
        SELECT * FROM services;
    `
    pool.query(sqlQuery)
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(dbErr=> {
            res.send('Error in GET /languages', dbErr);
        })
})

module.exports = router;