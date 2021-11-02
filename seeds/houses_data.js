const characters = require('../characters');

exports.seed = function(knex) {
  
  return knex('houses_table').truncate()
    .then(function() {
      let promiseArray = [];
      characters.map((el) => {
        if (el.houseName) {
          let name = el.characterName;
          el.houseName.forEach(function(house) {
            promiseArray.push(retrieveFromDB(name, house, knex));
          })
        }
      })
      return promiseArray;
    }).then((data)=>{return Promise.all(data)})
  };

const retrieveFromDB = async function(name, house, knex) {
  return knex('house_table').insert({house: house, name: name});
}