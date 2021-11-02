const characters = require('../Data/characters');

exports.seed = function(knex) {
  
  return knex('order_character').truncate()
    .then(function() {
      let promiseArray = [];
      characters.map((el) => {
        if (el.order) {
          let name = el.characterName;
          el.order.forEach(function(order) {
            promiseArray.push(retrieveFromDB(name, order, knex));
          })
        }
      })
      return promiseArray;
    }).then((data)=>{return Promise.all(data)})
  };

const retrieveFromDB = async function(name, order, knex) {
  return knex('order_character').insert({order: order, character: name});
}