const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res)=> {
    const userID = req.user.id;
    const childData = req.body;
    console.log(childData);
    //{name: '',
    // age: '',
    // primaryLanguage_id: '',
    // secondaryLanguage_id: '',
    // services: {
    //     '1': false,
    //     '2': true,
    //     '3': false,
    //     '4': false,
    //     '5': false,
    //     '6': false,
    //     '7': false,
    //     '8': false,
    //     '9': true,
    //     '10': false
    // }

    const {name, age, primaryLanguage_id, secondaryLanguage_id, services} = childData;

    const serviceId = Object.keys(services);
    const checkedStatus = Object.values(services);
    console.log('testing indexes',serviceId[0],checkedStatus[0]);

    const sqlQuery = `
        INSERT INTO children_services ("child_id", "service_id", "checked")
            VALUES
                (1, ${serviceId[0]}, ${checkedStatus[0]})
    ;`


    // const sqlQuery =`
    //     WITH ins1 AS (
    //         INSERT INTO children ("name", age)
    //             VALUES ($1, $2)
    //             RETURNING id AS child_id
    //         )
    //     , ins2 AS(
    //         INSERT INTO children_languages (child_id, language_id)
    //         VALUES
    //         ((SELECT child_id FROM ins1), $3),
    //         ((SELECT child_id FROM ins1), $4);
    // `
    // const sqlValues = [name, age, primaryLanguage_id, secondaryLanguage_id]

    pool.query(sqlQuery)
        .then(dbRes => {
            res.sendStatus(201);
        })
        .catch(err=>{
            res.sendStatus(500);
            console.log('error in POST /child:', err);
        })
})

module.exports = router;