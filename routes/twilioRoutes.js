const express = require("express");
const router = express.Router();
const VoiceResponse = require("twilio").twiml.VoiceResponse; // Import Twilio VoiceResponse

// Define route for handling Twilio voice calls
router.post("/twilio/call", (req, res) => {
  // Create a new TwiML VoiceResponse
  const twiml = new VoiceResponse();

  // Add instructions for the voice call using TwiML
  twiml.say("Hello! This is a voice call from your application.");

  // Return the TwiML response to Twilio
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

module.exports = router;
