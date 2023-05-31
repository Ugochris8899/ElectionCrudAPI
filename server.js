const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 1990;
app.use(express.json())

// Create Election schema
const electionSchema = new mongoose.Schema({
    state: String,
    parties: [String],
    result: {
        type: Object
    },
    collationOffice: String,
    isRigged: Boolean,
    total: Number,
    
  });
  
  const Election = mongoose.model('Election', electionSchema);
  
  // Create a new election
  app.post('/elections', async (req, res) => {
    try {
      const election = new Election(req.body);
      await election.save();
      res.status(201).json(election);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get all elections
  app.get('/elections', async (req, res) => {
    try {
      const elections = await Election.find();
      res.json({message: "The available Users are" + elections.length, data:elections});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



  // Get a specific election
  app.get('/elections/:id', async (req, res) => {
    try {
      const election = await Election.findById(req.params.id);
      if (!election) throw Error('Election not found');
      res.json(election);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
  
  // Update an election
  app.put('/elections/:id', async (req, res) => {
    try {
      const election = await Election.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!election) throw Error('Election not found');
      res.json(election);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });


  // Delete an election
  app.delete('/elections/:id', async (req, res) => {
    try {
      const election = await Election.findByIdAndDelete(req.params.id);
      if (!election) throw Error('Election not found');
      res.json({ message: 'Election deleted successfully' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

  // Connect to MongoDB

mongoose.connect("mongodb+srv://amagbaugochukwu:tNGFBoZKclidj2J1@cluster0.jyrip2b.mongodb.net/")
.then( () =>{
    console.log("connection to the database is successful");
})

  
  // Start the server
  app.listen(PORT, (req, res) =>{
    console.log(`Listening to server on port: ${PORT}`);
});