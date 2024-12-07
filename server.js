// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the models
const Distribution = require('./models/distribute'); // Assuming the file is called Distribution.js


// Initialize the express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());


// POST route to handle amount distribution submission
app.post('/distribute', async (req, res) => {
    try {
        const { amount, item, persons, amountPerPerson, currentDateTime } = req.body;

        // Validate the input data
        if (!amount || !item || !persons || persons.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }

        // Create a new distribution document
        const newDistribution = new Distribution({
            amount: amount,
            item: item,
            persons: persons,
            amountPerPerson: amountPerPerson
        });



        // Save the distribution to the database
        await newDistribution.save();

        // Respond with success
        res.status(201).json({ success: true, message: 'Distribution saved successfully' });
    } catch (error) {
        console.error('Error saving distribution:', error);
        res.status(500).json({ success: false, message: 'Error saving distribution data' });
    }
});

// New route to fetch total amount for a person (e.g., "personA")

  

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
