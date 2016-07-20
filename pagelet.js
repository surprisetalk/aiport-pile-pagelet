
var _ = require('underscore');
var piler = require('../aiport-dev/dev.js').pile;

// TODO: can we get around this mongoose thing?
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var schema = { scrap: String,
                          options: {}, 
                          pagelets: [ { type: Schema.Types.ObjectId, 
                                        ref: "pagelet" } ] };

// TODO: this is slow
var populator = model => pagelet_id =>
    firster( model )( { "_id": pagelet_id } );

var populatorer = model => pagelet =>
    Promise.all( pagelet.pagelets.map( populator( model ) ) ).then( pagelets => _.extend( pagelet, { pagelets: pagelets } ) );

var fetcher = model => data => 
    model.find( data ).then( pagelets => Promise.all( pagelets.map( populatorer( model ) ) ) );

var firster = model => data => 
    model.findOne( data ).then( populatorer( model ) );

var controllers = model => ({
    fetch: fetcher( model ),
    first: firster( model )
});

// TODO: population
module.exports = piler( "pagelet", schema, controllers );
