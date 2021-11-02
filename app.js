const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

app.get('/GOT/character/:id', async function(req, res) {
    let id = req.params.id;
    id = parseInt(id)
    console.log(id)
    let houseName = await knex
        .select('house')
        .from('house_character')
        .where({character: charName})
        .catch((err) => res.status(404).send('Error, content not found'));
    
    let siblingList = await knex
        .select('sibling_2')
        .from('siblings')
        .where({sibling_1: charName});

    let parentList = await knex
        .select('parent_1', 'parent_2')
        .from('parents')
        .where({child: charName});
    
    let spouse = await knex 
        .select('spouse_2')
        .from('marriage_table')
        .where({spouse_1: charName});

    let order = await knex
        .select('order')
        .from('order_character')
        .where({character: charName});
    
    let killed = await knex
        .select('killed')
        .from('kill_table')
        .where({killer: charName});

    let killer = await knex
        .select('killer')
        .from('kill_table')
        .where({killed: charName});

    let result = [
        { house: houseName},
        { siblings: siblingList},
        { parents: parentList },
        { spouse: spouse},
        { order: order},
        { killed: killed},
        { killer: killer}
    ];

    res.status(200).json(result);
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});