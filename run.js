const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');


// Import the models
const Distribution = require('./models/distribute'); // Assuming the file is called distribute.js
const req = require('express/lib/request');
const Login = require('./models/register');

// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json());


// Route to get all persons from the database
app.get('/data', async (req, res) => {
  try {
    const distributions = await Distribution.find(); // Fetch all distributions from the DB
    console.log("Fetched distributions:", distributions); // Debugging log

    // Extract unique persons from the distributions
    const persons = new Set();
    distributions.forEach(distribution => {
      distribution.persons.forEach(person => {
        persons.add(person); // Adds unique person names to the set
      });
    });

    console.log("Unique persons:", Array.from(persons)); // Debugging log

    // Send back the unique list of persons
    res.json(Array.from(persons)); // Convert Set to array and send it as JSON response
  } catch (err) {
    console.error("Error fetching persons:", err); // Error logging
    res.status(500).json({ message: 'Error retrieving data' });
  }
});


// Route to get the total amount for a specific person
app.get('/total/:person', async (req, res) => {
  const { person } = req.params;
  try {
    const distributions = await Distribution.find({
      persons: person  // Find distributions that include the selected person
    });

    // Calculate total amount for the person
    let totalAmount = 0;
    distributions.forEach(distribution => {
      totalAmount += distribution.amountPerPerson;  // Assuming each distribution has an 'amountPerPerson'
    });

    res.json({ person, totalAmount });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating total amount' });
  }
});




app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  try {
    // Check if the username already exists
    const existingUser = await Login.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists.' });
    }

    // Create a new user
    const newUser = new Login({ username, password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ success: false, message: 'Error registering user.' });
  }
});




app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Query the database to find the user by username
      const user = await Login.findOne({ username });

      // Check if the user exists and if the password matches
      if (user && user.password === password) {
          return res.status(200).send({ message: 'Login successful!' });
      }

      // If the username or password is incorrect
      res.status(401).send({ message: 'Invalid username or password.' });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send({ message: 'Internal server error.' });
  }
});





// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
