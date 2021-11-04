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

app.get('/GOT/characters', async function(req, res) {

    const characters = await knex
        .select('c.name', 'c.royalty', 'c.image', 'c.attack_value', 'oc.order', 'hc.house')
        .from('characters AS c')
        .leftJoin('house_character AS hc', 'c.name', '=', 'hc.character')
        .leftJoin('order_character AS oc', function(){
            this
            .on('oc.character', 'c.name')
        })
        .catch((err) => res.status(404).send('Error, content not found'));

    const houses = await knex('houses');
    const orders = await knex('orders');
    const spouses = await knex('marriage_table');
    const siblings = await knex('siblings');
    const kills = await knex('kill_table');

    res.status(200).send({
        characters: characters,
        houses: houses,
        relationships: spouses,
        siblings: siblings,
        orders: orders,
        kills: kills,
    });

});

app.get('/GOT/houses', async function(req, res) {
    let houses = await knex('houses');
    let house_members = await knex('house_character');

    res.status(200).send([
        {houses: houses},
        {house_relations: house_members}
    ]);
});

app.get('/GOT/orders', async function(req, res) {
    let orders = await knex('orders');
    let order_relations = await knex('order_character');

    res.status(200).send([
        { orders: orders },
        { order_relations: order_relations }
    ])
})

app.get('/GOT/duel', async function(req,res) {
    let result = await knex('characters')
        .select('name', 'attack_value', 'image')
    res.status(200).send(result)
})

app.get('/GOT/tree/:id', async function(req,res) {
    let charID = parseInt(req.params.id, 10);

    let charName = await knex
        .select('name')
        .from('characters')
        .where({id: charID})
        .catch((err) => res.status(404).send('Error, data not found'));
    
    charName = charName[0].name;

    
    //find child parents/siblings
    let childTree = await findFamily(charName, knex);


    let parent1, parent2;
    //find parents siblings/parents
    parent1 = childTree.length == 0 ? null : childTree[0].parent_1;
    parent2 = childTree.length == 0 ? null : childTree[0].parent_2;
    let Tree1 = await findFamily(parent1, knex);

    //find grandparents siblings/parents if previous tree called exists
    let Tree3, Tree4, grandparent1, grandparent2;
    if (!Tree1 || Tree1.length == 0){
        Tree3 = undefined;
        Tree4 = undefined;
    } else {
        grandparent1 = Tree1[0].parent_1;
        grandparent2 = Tree1[0].parent_2;
        Tree3 = await findFamily(grandparent1, knex);
        Tree4 = await findFamily(grandparent2, knex);
    }

    let Tree2 = await findFamily(parent2, knex);

    let Tree5, Tree6, grandparent3, grandparent4;
    if(!Tree2 || Tree2.length == 0){
        Tree5 = undefined;
        Tree6 = undefined;
    } else {
        grandparent3 = Tree2[0].parent_1;
        grandparent4 = Tree2[0].parent_2;
        Tree5 = await findFamily(grandparent3, knex);
        Tree6 = await findFamily(grandparent4, knex);

    }
    
    let siblingTree = [];
    if (!Tree1 && !Tree2 && childTree.length == 0){
        siblingTree = await findSiblings( charName, knex );
    }

    let result;
    
    result = siblingTree.length > 0 ? {charName, siblingTree} : {
        charName,
        childTree,
        parent1,
        Tree1,
        parent2,
        Tree2,
        grandparent1,
        Tree3,
        grandparent2,
        Tree4,
        grandparent3,
        Tree5,
        grandparent4,
        Tree6,
    };

    res.status(200).send(result);
})

module.exports = {app , knex}

const findFamily = async (input, knex) => {

    return result = input == null ? undefined 
    : await knex 
        .select('p.parent_1', 'p.parent_2', 's.sibling_2')
        .from('parents AS p')
        .where({child: input})
        .innerJoin('siblings AS s', function() {
            this
            .on('s.sibling_1', 'p.child')
        })
        .then((res) => res);
}

const findSiblings = async (input, knex) => {

    return result = await knex 
        .select('sibling_2')
        .from('siblings')
        .where({sibling_1: input});
}