const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

               // 👇 allows us to use await.
router.post('/', (req, res)=> {
    const userID = req.user.id;
    const sqlQuery=`
        INSERT INTO children ("name", "age", "user_id")
            VALUES ($1, $2, $3);
    `
    console.log(userID)
    const {name, age} = req.body
    console.log(req.body);

    const sqlValues=[name, Number(age), userID]
    pool.query(sqlQuery,sqlValues)
        .then(dbRes => {
            res.sendStatus(201);
        })
        .catch(err=>{
            res.sendStatus(500);
            console.log('error in POST /child:', err);
        })
})

module.exports = router;