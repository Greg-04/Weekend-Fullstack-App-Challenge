const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET

router.get('/', (req, res) => {
    const dbQuery = 'SELECT * FROM "toDoList" ORDER BY "id" ASC;';
    pool
        .query(dbQuery)
        .then((result) => {
            console.log('RESULT', result);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('ERROR', err);

            res.sendStatus(500);
        });
});

// POST

router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO "toDoList" ("Task", "Description")
    VALUES 
	($1, $2);`;
    const queryArgs = [
        newTask.Task,
        newTask.Description,
    ];
    pool    
        .query(queryText, queryArgs)
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

// PUT

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);

    // const updatedTaskDescription = req.body.Description;
    // console.log('req.body.description', updatedTaskDescription)

    // if (updatedTaskDescription === undefined) {
    //     return res.status(400).send('Invalid data provided');
    // }

    //old queryText
//   let queryText = `UPDATE "toDoList" SET "Description" = $1 WHERE "id" = $2;`;

    let queryText = `UPDATE "toDoList" SET "Status" = NOT "Status" WHERE "id" = $1;`;    

  pool
    // .query(queryText, [updatedTaskDescription, id])
    .query(queryText, [id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error:', err);
      res.sendStatus(500);
    });
});

// DELETE

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const queryText = 'DELETE FROM "toDoList" WHERE "id" = $1;';

    pool
        .query(queryText, [id])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(`Error: making database query ${queryText}`, err);
            res.sendStatus(500); // good server always responds
        });
});

module.exports = router;
