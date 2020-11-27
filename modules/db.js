// https://github.com/louischatriot/nedb
// https://github.com/bajankristof/nedb-promises
const Datastore =require ('nedb-promises')

let datastore = Datastore.create({ filename: 'local.db', autoload: true })
datastore.persistence.setAutocompactionInterval(500)

module.exports = datastore;
