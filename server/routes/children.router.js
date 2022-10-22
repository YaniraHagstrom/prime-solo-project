const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// GETs all children data (including services) for logged-in user:
router.get('/', (req, res)=>{
    const sqlQuery = 
    `
    SELECT * 
    FROM 
        children 
	INNER JOIN 
        (SELECT *
	FROM   
        crosstab
        ('SELECT child_id, service_id, checked FROM children_services'
    ) AS checked (child_id INT, "1" BOOLEAN, "2" BOOLEAN, "3" BOOLEAN, "4" BOOLEAN, "5" BOOLEAN, "6" BOOLEAN, "7" BOOLEAN, "8" BOOLEAN, "9" BOOLEAN, "10" BOOLEAN)
    ) AS foo
    ON children.id = foo.child_id 	
    WHERE children.user_id = $1;
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