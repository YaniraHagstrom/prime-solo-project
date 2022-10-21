const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {    
    const childID = req.body.childID;
    const providerID = req.body.providerID;
    const sqlQuery =
    `
    INSERT INTO favorites ("child_id", "provider_id")
        VALUES ($1, $2);
    `

    const sqlValues = [childID, providerID]

    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error in POST /favorites:',error);
        })

});


router.get('/:childID', (req, res) => {
    const childID = req.params.childID;
    console.log(req.params);
    const sqlQuery = 
    `
    SELECT * FROM providers
        INNER JOIN favorites    
                ON providers.id = favorites.provider_id
        WHERE favorites.child_id = $1;
    `

    const sqlValues = [childID]

    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.send(dbRes.rows);
            console.log(dbRes.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error in GET /favorites:',error);
        })
});




module.exports = router;