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

    // console.log('received GET to add child for testing results page');

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
            ((SELECT child_id FROM ins1), ${serviceId[9]}, ${checkedStatus[9]})
            RETURNING child_id;
        
    `
    const sqlValues = [name, age, userID, primaryLanguage_id, secondaryLanguage_id]

    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.send(dbRes.rows[0]);
            console.log(dbRes.rows);
            
        })
        .catch(err=>{
            res.sendStatus(500);
            console.log('error in POST /child:', err);
        })
})

// GET route to search for providers that match the child search criteria.

router.get('/:childID', (req, res)=> {
    // ex req.params{ childID: '4' }
    const childID = req.params.childID;
    const userID = req.user.id;
    const sqlQuery = 
    `
    SELECT
        DISTINCT providers.id, CONCAT(providers.first_name,' ', providers.last_name) AS name, providers.country_id, providers.city_id, providers.min_age, providers.max_age, providers.icon, providers.language_id1, providers.language_id2, providers_services.provider_id, providers_services."1", providers_services."2", providers_services."3", providers_services."4", providers_services."5", providers_services."6", providers_services."7", providers_services."8", providers_services."9", providers_services."10"
    FROM
        children
    INNER JOIN
        "user"
    ON 
        children.user_id = "user".id
    INNER JOIN 
        children_services
    ON 
        children.id = children_services.child_id 
    INNER JOIN
        services
    ON 
        children_services.service_id = services.id
    INNER JOIN 
        providers_services
    ON 
        services.id = providers_services.provider_id
    INNER JOIN 
        providers
    ON 
        providers_services.provider_id = providers.id
    INNER JOIN
        children_languages
    ON 
        children.id = children_languages.child_id
    WHERE 
        "user".id = $1 AND children.id = $2 
        AND (providers.language_id1 = children_languages.language_id OR providers.language_id2 = children_languages.language_id);
    `

    const sqlValues = [userID, childID]
    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(dbErr=> {
            res.send('Error in GET /child/:childID', dbErr);
        })
})


module.exports = router;

