const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/providers/:childID', (req, res)=> {
  // ex req.params{ childID: '4' }
    const childID = req.params.childID;
    const userID = req.user.id;
    const sqlQuery = 
    `
    SELECT
        DISTINCT children.id AS childID, providers.id, CONCAT(providers.first_name,' ', providers.last_name) AS name, providers.country_id, providers.city_id, providers.min_age, providers.max_age, providers.icon, providers.language_id1, providers.language_id2, providers_services.provider_id, providers_services."1", providers_services."2", providers_services."3", providers_services."4", providers_services."5", providers_services."6", providers_services."7", providers_services."8", providers_services."9", providers_services."10"
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

    router.get('/services/:childID', (req, res)=> {
    // ex req.params{ childID: '4' }
    const childID = req.params.childID;
    const userID = req.user.id;
    const sqlQuery =
    `
    
    ` 
    

    const sqlValues = [userID, childID]
    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            console.log(dbRes.rows[0]);
            res.send(dbRes.rows);
        })
        .catch(dbErr=> {
            res.send('Error in GET /child/:childID', dbErr);
        })
})
module.exports = router;
