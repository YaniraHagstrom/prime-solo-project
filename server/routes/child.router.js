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

router.get('/:childData', (req, res)=> {
    console.log(req.params.childData);
})


module.exports = router;

// Mock Provider Data:
// ('Patin', 'Shimman', 2, 2, 3, 21),
// ('Torie', 'Rowbotham', 3, 1, 2, 18),
// ('Lucilia', 'Cuer', 3, 2, 4, 26),
// ('Laural', 'Spencelayh', 4, 2, 3, 26),
// ('Daisi', 'Gowen', 2, 1, 3, 29),
// ('Karim', 'Cartmael', 4, 2, 3, 10),
// ('Winston', 'Theis', 3, 2, 2, 23),
// ('Marice', 'Conboy', 2, 1, 3, 13),
// ('Juieta', 'Haker', 1, 1, 4, 28),
// ('Amerigo', 'Vasenkov', 2, 2, 5, 30),
// ('Blaire', 'Towler', 1, 1, 3, 27),
// ('Wang', 'Pittson', 1, 1, 2, 28),
// ('Cory', 'Sowthcote', 2, 1, 2, 21),
// ('Holly', 'Lates', 4, 1, 2, 15),
// ('Bernice', 'Kittoe', 3, 1, 4, 12),
// ('Laina', 'Manterfield', 2, 2, 3, 10),
// ('Erminie', 'Mallinder', 4, 1, 2, 21),
// ('Sean', 'Forri', 3, 2, 2, 5),
// ('Reinaldo', 'Alliker', 3, 2, 3, 17),
// ('Rosamond', 'Ingry', 4, 2, 3, 28),
// ('Violet', 'Brizell', 4, 2, 5, 7),
// ('Gerhardt', 'Jakobsson', 1, 1, 2, 10),
// ('Judas', 'Chinnery', 2, 2, 4, 28),
// ('Jerrine', 'Jailler', 1, 1, 2, 21),
// ('Karyn', 'Osmant', 3, 2, 3, 18),
// ('Bell', 'Sarchwell', 4, 2, 5, 10),
// ('Lauretta', 'Mutter', 2, 1, 2, 20),
// ('Marcela', 'Ogelsby', 4, 2, 5, 29),
// ('Hillery', 'Busswell', 3, 2, 3, 8),
// ('Robbie', 'Bracchi', 2, 1, 5, 10),
// ('Row', 'Lancetter', 3, 1, 3, 12),
// ('Dulcia', 'Bennison', 4, 2, 4, 18),
// ('Alikee', 'Bursnoll', 3, 2, 3, 6),
// ('Onfroi', 'Henrichsen', 2, 1, 5, 12),
// ('Rodrique', 'Loughton', 2, 2, 3, 18),
// ('Brittan', 'McCarry', 1, 1, 5, 22),
// ('Valentino', 'Jellyman', 1, 2, 4, 10),
// ('Siouxie', 'Kilpin', 4, 2, 2, 25),
// ('Peirce', 'Vannuccini', 1, 1, 2, 14),
// ('Carley', 'Granham', 1, 2, 4, 27),
// ('Bertie', 'Borkett', 1, 2, 5, 23),
// ('Kiersten', 'Leadbeater', 1, 1, 3, 28),
// ('Sandy', 'Wiersma', 2, 1, 5, 20),
// ('Bevon', 'Alderson', 3, 2, 5, 17),
// ('Brina', 'Carslaw', 2, 1, 5, 9),
// ('Alfy', 'Laban', 2, 1, 2, 7),
// ('Slade', 'Matthewes', 3, 2, 4, 25),
// ('Wally', 'Ruggier', 1, 1, 3, 5),
// ('Annecorinne', 'Coolson', 2, 1, 5, 25),
// ('Ingra', 'Whylie', 2, 2, 4, 10);