const characters = require('../Data/characters');

exports.seed = function(knex) {
  
  return knex('house_character').truncate()
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
  return knex('house_character').insert({house: house, character: name});
}