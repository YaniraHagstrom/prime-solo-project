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
    console.log('primary:',primaryLanguage_id, 'secondary:', secondaryLanguage_id);

    const serviceId = Object.keys(services);
    const checkedStatus = Object.values(services);
    // console.log('testing indexes',serviceId[0],checkedStatus[0]);

    const sqlQuery =`
        WITH ins1 AS (
            INSERT INTO children ("name", age, user_id)
                VALUES ($1, $2, $3)
                RETURNING id AS child_id
            )
        , ins2 AS(
            INSERT INTO children_languages (child_id, language_id)
            VALUES
            ((SELECT child_id FROM ins1), $4),
            ((SELECT child_id FROM ins1), $5)
            )
        INSERT INTO children_services (child_id, service_id, checked)
        VALUES
            ((SELECT child_id FROM ins1), ${serviceId[0]}, ${checkedStatus[0]}),
            ((SELECT child_id FROM ins1), ${serviceId[1]}, ${checkedStatus[1]}),
            ((SELECT child_id FROM ins1), ${serviceId[2]}, ${checkedStatus[2]}),
            ((SELECT child_id FROM ins1), ${serviceId[3]}, ${checkedStatus[3]}),
            ((SELECT child_id FROM ins1), ${serviceId[4]}, ${checkedStatus[4]}),
            ((SELECT child_id FROM ins1), ${serviceId[5]}, ${checkedStatus[5]}),
            ((SELECT child_id FROM ins1), ${serviceId[6]}, ${checkedStatus[6]}),
            ((SELECT child_id FROM ins1), ${serviceId[7]}, ${checkedStatus[7]}),
            ((SELECT child_id FROM ins1), ${serviceId[8]}, ${checkedStatus[8]}),
            ((SELECT child_id FROM ins1), ${serviceId[9]}, ${checkedStatus[9]});
    `
    const sqlValues = [name, age, userID, primaryLanguage_id, secondaryLanguage_id]

    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.sendStatus(201);
        })
        .catch(err=>{
            res.sendStatus(500);
            console.log('error in POST /child:', err);
        })
})

module.exports = router;