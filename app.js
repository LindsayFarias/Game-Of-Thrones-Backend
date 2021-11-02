const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.json());
app.use(morgan('dev'));

app.get('/GOT/characters', async function(req, res) {
    const characters = await knex
        .select('name', 'royalty', 'image')
        .from('characters')
        .then((data) => data)
        .catch((err) => res.status(404).send('Error, content not found'));
    
    const houses = await knex('house_character')

    const spouses = await knex('marriage_table')

    res.status(200).json({
        characters: characters,
        houses: houses,
        relationships: spouses
    });
    
});

// app.get('/GOT/character/:name', async function(req, res) {
//     const charName = req.params.name;
//     let houseName = await knex
//         .select('house')
//         .from('house_character')
//         .where({name: charName})
//         .catch((err) => res.status(404).send('Error, content not found'));
    
//     let siblingList = await knex
//         .select('sibling_2')
//         .from('siblings')
//         .where({sibling_1: charName});

//     let parentList = await knex
//         .select('parent_1', 'parent_2')
//         .from('parents')
//         .where({child: charName});

//     let 
// })

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});