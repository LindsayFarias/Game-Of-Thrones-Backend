const characters = require('../characters');

exports.seed = function(knex) {
  
  return knex('orders_table').truncate()
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
  return knex('orders_table').insert({order: order, name: name});
}