const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



router.get('/', (req, res)=>{
    console.log('getting get children request');
    const sqlQuery = 
    `
        SELECT * FROM children
            WHERE user_id = $1;
    `

    const sqlValues = [req.user.id]
    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.error('error in GET /children:', error)
        })
})


module.exports = router;