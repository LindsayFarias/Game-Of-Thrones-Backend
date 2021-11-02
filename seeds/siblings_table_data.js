const characters = require('../characters');

exports.seed = function(knex) {
  
  return knex('siblings').truncate()
    .then(function() {
      let promiseArray = [];
      characters.map((el) => {
        if (el.siblings) {
          let sibling1 = el.characterName;
          el.siblings.forEach(function(sibling2) {
            promiseArray.push(retrieveFromDB(sibling1, sibling2, knex));
          })
        }
      })
      return promiseArray;
    }).then((data)=>{return Promise.all(data)})
  };

const retrieveFromDB = async function(sibling1, sibling2, knex) {
  return knex('siblings').insert({sibling_1: sibling1, sibling_2: sibling2});
}
