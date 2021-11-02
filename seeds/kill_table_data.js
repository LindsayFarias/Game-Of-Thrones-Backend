const characters = require('../Data/characters');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('kill_table').truncate()
    .then(function() {
      let promiseArray = [];
      characters.map((el) => {
        if (el.killed) {
          let killer = el.characterName;
          el.killed.forEach(function(victim) {
            promiseArray.push(retrieveFromDB(killer, victim, knex));
          })
        }
      })
      return promiseArray;
    }).then((data)=>{return Promise.all(data)})
  };

const retrieveFromDB = async function(killer, victim, knex) {
  return knex('kill_table').insert({killer: killer, killed: victim});
}

// const findMatch = async function(knex, input) {
//   //need to go through the characters and pull the killed members and then compare the 
//   //name of the killer to the database to map ids to new table
//   return input.map((el) => {
//     let killerName = el.characterName;
//     console.log('killer:', killerName);
//     if (el.killed) {
//         el.killed.forEach(async function(victim) {
//           console.log('victim:', victim);
//         let killerID = await knex
//                     .select('characters.id')
//                     .from('characters')
//                     .where("name", killerName)
//                     .then((data) => data)
//                     .catch((err) => console.log(err));
//         let killedID = await knex
//                     .select('characters.id')
//                     .from('characters')
//                     .where("name", victim)
//                     .then((data) => data)
//                     .catch((err) => console.log(err));
//         setTable(killerID, killedID, knex);
//     })}
//   })
// }