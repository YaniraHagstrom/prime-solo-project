const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {    
    const childID = req.body.childID;
    const providerID = req.body.providerID;
    console.log(req.body)
    console.log('favorites id data:',req.body.childID);
    const sqlQuery =
    `
    INSERT INTO favorites ("child_id", "provider_id")
        VALUES ($1, $2);
    `

    const sqlValues = [childID, providerID]

    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.sendStatus(200);
            console.log('posted')
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error in POST /favorites:',error);
        })

});


router.get('/', (req, res) => {
  // GET route code here
});




module.exports = router;