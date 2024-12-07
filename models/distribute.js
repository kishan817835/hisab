const mongoose = require('../db');



// Define the Distribution Schema
const DistributionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    

    amountPerPerson:{
        type: Number,
        required: true
    },

    currentDateTime:{
type: Date,
default: Date.now
},
    persons: [{
        type: String,  // Assuming persons are just strings, you can replace this with an ObjectId reference if you want
        required: true
    }],
  
});

// Create a model based on the schema
const Distribution = mongoose.model('distribute', DistributionSchema);

module.exports = Distribution;
