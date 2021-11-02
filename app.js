const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(
    cors({
        origin: "*",
        methods: "GET" 
    }));
app.use(express.json());

app.get('/GOT', async function(req, res) {

    let query = JSON.stringify(req.query.name);

    if (query) {
        const id = await knex 
            .select('id')
            .from('characters')
            .where({name: query})
            .then((data) => data)
            .catch((err) => res.status(404).send('Error, content not found'));

        res.redirect(`/GOT/characters/${id}`);
    }

});

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

app.get('/GOT/characters/:input', async function(req, res) {
    const id = parseInt(req.params.input, 10);
    let charName = await knex
        .select('name')
        .from('characters')
        .where({id: id})
        .then((data)=>data)
        .catch((err) => res.status(404).send('Error, content not found'));

    if(charName[0]) charName = charName[0].name
    else res.status(404).send('Error, data not found');

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
        { name: charName },
        { house: houseName}, 
        { siblings: siblingList},
        { parents: parentList}, 
        { spouse: spouse }, 
        { order: order}, 
        { killed: killed}, 
        { killer: killer}
    ];

    res.status(200).json(result);
})

app.get('/GOT/houses', async function(req, res) {
    let houses = await knex('houses');
    let house_members = await knex('house_character');

    res.status(200).json([
        {houses: houses},
        {house_relations: house_members}
    ]);
});

app.get('/GOT/orders', async function(req, res) {
    let orders = await knex('orders');
    let order_relations = await knex('order_character');

    res.status(200).json([
        { orders: orders },
        { order_relations: order_relations }
    ])
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});