const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res)=> {
    // console.log('receiving Post Request with this data:',req.body)
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
// router.get('/:childID', (req, res)=> {
//     const childID = req.params.childID;
//     const sqlQuery = 
//     `
//     SELECT * FROM children 
// 	INNER JOIN (
// 	SELECT *
// 	FROM   crosstab(
//         'SELECT child_id, service_id, checked
//         FROM   children_services'
//         ) AS checked (child_id INT, "1" BOOLEAN, "2" BOOLEAN, "3" BOOLEAN, "4" BOOLEAN, "5" BOOLEAN, "6" BOOLEAN, "7" BOOLEAN, "8" BOOLEAN, "9" BOOLEAN, "10" BOOLEAN)
//         ) AS foo
//         ON children.id = foo.child_id
//         WHERE children.id = $1;
//     `
//     const sqlValues=[childID]
//     pool.query(sqlQuery, sqlValues)
//         .then(dbRes => {
//             res.send(dbRes.rows);
//         })
//         .catch(dbErr=> {
//             res.sendStatus(500)
//             console.log('Error in GET /child/:childID', dbErr);
//         })
// })


// PUT for ChildEditForm:
// router.put('/:childID', (req, res)=> {
//     const childID = req.params.childID;
//     const childUpdate = req.body;
//     const {name, age, primarylanguage_id, secondarylanguage_id} =childUpdate;
//     console.log('childUpdate:', childUpdate)
//     const sqlQuery = 
//     `
//     WITH src1 AS (
//         UPDATE children
//         SET name=$1, age=$2::INT, primarylanguage_id=$3, secondarylanguage_id=$4
//         WHERE id = $5
//     ) 
//     UPDATE children_services AS t set
//         checked = c.checked
//     FROM (VALUES
//         ($6, $7::BOOLEAN),
//         ($8, $9::BOOLEAN),
//         ($10, $11::BOOLEAN),
//         ($12, $13::BOOLEAN),
//         ($14, $15::BOOLEAN),
//         ($16, $17::BOOLEAN),
//         ($18, $19::BOOLEAN),
//         ($20, $21::BOOLEAN),
//         ($22, $23::BOOLEAN),
//         ($24, $25::BOOLEAN)
//     ) AS c(service_id, checked) 
//     WHERE t.child_id = $5::INT;
//     `

//     const sqlValues = [name, Number(age), primarylanguage_id, secondarylanguage_id, Number(childID), 1, String(childUpdate[1]), 2, String(childUpdate[2]), 3, String(childUpdate[3]), 4, String(childUpdate[4]), 5, String(childUpdate[5]), 6, String(childUpdate[6]), 7, String(childUpdate[7]), 8, String(childUpdate[8]), 9, String(childUpdate[9]), 10, String(childUpdate[10])];
//     // console.log('values', sqlValues)
//     pool.query(sqlQuery, sqlValues)
//         .then(dbRes => {
//             res.sendStatus(200);
//         })
//         .catch(dbErr=> {
//             res.sendStatus(500)
//             console.log('Error in PUT /child/:childID', dbErr);
//         })
// })

// PUT for ChildEditForm:
router.put('/:childID', (req, res)=> {
    const connect  = pool.connect();
    const childID = req.params.childID;
    const childUpdate = req.body;
    const {name, age, primarylanguage_id, secondarylanguage_id} =childUpdate;
    const checked = true;
    console.log()
    const sqlQuery = 
    `
    WITH src1 AS (
        UPDATE children
        SET name=$1, age=$2::INT, primarylanguage_id=$3, secondarylanguage_id=$4
        WHERE id = $5
    ) 
    UPDATE children_services AS t set
        checked = c.checked
    FROM (VALUES
        ($6, $7::BOOLEAN)
    ) AS c(service_id, checked) 
    WHERE t.child_id = $5::INT;
    `

    const sqlValues = [name, age, primarylanguage_id, secondarylanguage_id, childID, 3, checked];
    console.log('values', sqlValues)
    pool.query(sqlQuery, sqlValues)
        .then(dbRes => {
            res.sendStatus(200);
        })
        .catch(dbErr=> {
            res.sendStatus(500)
            console.log('Error in PUT /child/:childID', dbErr);
        })
})


module.exports = router;

