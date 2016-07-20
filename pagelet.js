
var piler = require('../aiport-dev/dev.js').pile;

// TODO: can we get around this mongoose thing?
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// TODO: population
module.exports = piler( "pagelet", 
                        { scrap: String,
                          options: {}, 
                          pagelets: [ { type: Schema.Types.ObjectId, 
                                        ref: "pagelet" } ] } );
