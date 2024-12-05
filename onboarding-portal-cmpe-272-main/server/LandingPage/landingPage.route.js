import express from 'express';
import LandingPage from './LandingPage.js';

const router = express.Router();

// Save or update landing page details
router.post('/', async (req, res) => {
    try {
      const { userId, ...landingPageData } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.error("Invalid userId format");
        return res.status(400).json({ error: "Invalid userId format" });
      }
      const objectIdUserId = mongoose.Types.ObjectId(userId);
  
      // Check for an existing record
      let existingDetails = await LandingPage.findOne({ userId: objectIdUserId });
      console.log("Existing Details:", existingDetails);
  
      if (existingDetails) {
        // Update existing record
        const updatedDetails = await LandingPage.findByIdAndUpdate(
          existingDetails._id,
          { $set: landingPageData },
          { new: true }
        );
        console.log("Updated Details:", updatedDetails);
        return res.status(200).json(updatedDetails);
      } else {
        // Create new record
        const newDetails = new LandingPage({ userId: objectIdUserId, ...landingPageData });
        const savedDetails = await newDetails.save();
        console.log("Saved Details:", savedDetails);
        return res.status(201).json(savedDetails);
      }
    } catch (error) {
      console.error('Error saving landing page details:', error.message, error.stack);
      res.status(500).json({ error: 'Failed to save landing page details.' });
    }
  });
  

// Fetch landing page details by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const details = await LandingPage.findOne({ userId });
    if (details) {
      res.status(200).json(details);
    } else {
      res.status(404).json({ message: 'Details not found.' });
    }
  } catch (error) {
    console.error('Error fetching landing page details:', error);
    res.status(500).json({ error: 'Failed to fetch landing page details.' });
  }
});

export default router;
