const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res)=> {
    const userID = req.user.id;
    const newChild = req.body;

    const {name, age, primaryLanguage_id, secondaryLanguage_id, services} = newChild;

    

    const sqlQuery =`
        WITH ins1 AS (
            INSERT INTO children ("name", age, primarylanguage_id, secondarylanguage_id, user_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id AS child_id
            )
        INSERT INTO children_services (child_id, service_id, checked)
        VALUES
            ((SELECT child_id FROM ins1), $6, $7),
            ((SELECT child_id FROM ins1), $8, $9),
            ((SELECT child_id FROM ins1), $10, $11),
            ((SELECT child_id FROM ins1), $12, $13),
            ((SELECT child_id FROM ins1), $14, $15),
            ((SELECT child_id FROM ins1), $16, $17),
            ((SELECT child_id FROM ins1), $18, $19),
            ((SELECT child_id FROM ins1), $20, $21),
            ((SELECT child_id FROM ins1), $22, $23),
            ((SELECT child_id FROM ins1), $24, $25)
            RETURNING child_id;
        
    `
    const sqlValues = [name, age, primaryLanguage_id, secondaryLanguage_id, userID, 1, newChild[1], 2, newChild[2], 3, newChild[3], 4, newChild[4], 5, newChild[5], 6, newChild[6], 7, newChild[7], 8, newChild[8], 9, newChild[9], 10, newChild[10]]

    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.send(dbRes.rows[0]);// sends back the child_id
            // console.log(dbRes.rows);
            
        })
        .catch(err=>{
            res.sendStatus(500);
            console.log('error in POST /child:', err);
        })
})

// This GET if for individual child data for editing the form.
router.get('/:childID', (req, res)=> {
    const childID = req.params.childID;
    const sqlQuery = 
    `
    SELECT * FROM children 
	INNER JOIN (
	SELECT *
	FROM   crosstab(
        'SELECT child_id, service_id, checked
        FROM   children_services'
        ) AS checked (child_id INT, "1" BOOLEAN, "2" BOOLEAN, "3" BOOLEAN, "4" BOOLEAN, "5" BOOLEAN, "6" BOOLEAN, "7" BOOLEAN, "8" BOOLEAN, "9" BOOLEAN, "10" BOOLEAN)
        ) AS foo
        ON children.id = foo.child_id
        WHERE children.id = $1;
    `
    const sqlValues=[childID]
    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(dbErr=> {
            res.sendStatus(500)
            console.log('Error in GET /child/:childID', dbErr);
        })
})


// PUT for ChildEditForm:
router.put('/:childID', (req, res)=> {
    const connect  = pool.connect();
    const childID = req.params.childID;
    const childUpdate = req.body;
    const {name, age, primarylanguage_id, secondarylanguage_id} =childUpdate;
    // console.log('testing boolean',typeof childUpdate[10]);
    // console.log(childUpdate);
    // const serviceArray = [1,2,3,4,5,6,7,8,9,10]
    // for (let id of serviceArray){
    //     if (childUpdate[id] = true) {
    //         childUpdate[id] = true;
    //     }
    //     else{
    //         childUpdate[id] = false;
    //     }
    // }
    const sqlQuery = 
    `
    WITH src1 AS (
        UPDATE children
        SET name=$1, age=$2, primarylanguage_id=$3, secondarylanguage_id=$4
        WHERE id = $5
    ) 
    UPDATE children_services AS t set
        checked = c.checked
    FROM (VALUES
        ($6, $7),
        ($8, $9),
        ($10, $11),
        ($12, $13),
        ($14, $15),
        ($16, $17),
        ($18, $19),
        ($20, $21),
        ($22, $23),
        ($24, $25)
    ) AS c(service_id, checked) 
    WHERE t.child_id = $5;
    `

    const sqlValues = [name, Number(age), primarylanguage_id, secondarylanguage_id, Number(childID), 1, childUpdate[1], 2, childUpdate[2], 3, childUpdate[3], 4, childUpdate[4], 5, childUpdate[5], 6, childUpdate[6], 7, childUpdate[7], 8, childUpdate[8], 9, childUpdate[9], 10, childUpdate[10]];
    // console.log('values', sqlValues)
    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.sendStatus(200);
        })
        .catch(dbErr=> {
            res.sendStatus(500)
            console.log('Error in PUT /child/:childID', dbErr);
        })
})



// GET route to search for providers that match the child search criteria.

router.get('/search/:childID', (req, res)=> {
    // ex req.params{ childID: '4' }
    const childID = req.params.childID;
    const userID = req.user.id;
    const sqlQuery = 
    `
    SELECT
        DISTINCT providers.id, CONCAT(providers.first_name,' ', providers.last_name) AS name, providers.country_id, providers.city_id, providers.min_age, providers.max_age, providers.icon, providers.language_id1, providers.language_id2, providers_services.provider_id, providers_services."1", providers_services."2", providers_services."3", providers_services."4", providers_services."5", providers_services."6", providers_services."7", providers_services."8", providers_services."9", providers_services."10", children_services.child_id AS child_id
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
    WHERE 
        "user".id = $1 AND children.id = $2 
        AND (providers.language_id1 = children.primarylanguage_id OR providers.language_id2 = children.secondarylanguage_id OR providers.language_id2 = children.primarylanguage_id OR providers.language_id1 = children.secondarylanguage_id);
    `

    const sqlValues = [userID, childID]
    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.send(dbRes.rows);
            console.log(dbRes.rows[0]);   
        })
        .catch(dbErr=> {
            res.sendStatus(500);
            console.log('Error in GET /child/search/:childID', dbErr);
        })
})


module.exports = router;

