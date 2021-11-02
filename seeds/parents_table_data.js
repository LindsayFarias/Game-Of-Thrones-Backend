const characters = require('../characters');

exports.seed = function(knex) {
  
  return knex('parents').truncate()
    .then(function() {
      let promiseArray = [];
      characters.map((el) => {
        if (el.parents) {
          let child = el.characterName;
          let parent1 = el.parents[0];
          let parent2 = el.parents[1] ? el.parents[1] : null;
          promiseArray.push(retrieveFromDB(child, parent1, parent2, knex));
        }
      })
      return promiseArray;
    }).then((data)=>{return Promise.all(data)})
  };

const retrieveFromDB = async function(child, parent1, parent2, knex) {
  return knex('parents').insert({child: child, parent_1: parent1, parent_2: parent2});
}
