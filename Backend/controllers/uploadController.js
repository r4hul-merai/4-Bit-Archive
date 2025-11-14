const fs = require('fs');
const path = require('path');
const { createWorker } = require('tesseract.js');
const Medicine = require('../models/Medicine');

// @desc    Upload image and process with OCR
// @route   POST /api/upload/image
// @access  Public
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }

    const imagePath = path.join(__dirname, '..', req.file.path);
    
    // Initialize Tesseract.js worker
    const worker = await createWorker('eng');
    
    try {
      // Recognize text from image
      const { data: { text } } = await worker.recognize(imagePath);
      await worker.terminate();
      
      // Clean up the uploaded file
      fs.unlinkSync(imagePath);
      
      // Extract medicine name (simple approach - in a real app, you'd need more sophisticated parsing)
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const potentialNames = lines
        .map(line => line.trim())
        .filter(line => line.length > 3 && line.length < 50); // Filter out too short or too long lines
      
      if (potentialNames.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Could not extract medicine name from the image' 
        });
      }
      
      // Search for medicines with similar names
      const searchResults = await Medicine.find(
        { $text: { $search: potentialNames.join(' ') } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' } }).limit(10);
      
      // If no direct matches found, try to find by salt or generic name
      let alternatives = [];
      if (searchResults.length === 0) {
        // Try to find by potential salt names (assuming the first word might be a salt)
        const potentialSalt = potentialNames[0].split(' ')[0];
        alternatives = await Medicine.find({
          $or: [
            { salt: { $regex: potentialSalt, $options: 'i' } },
            { genericName: { $regex: potentialSalt, $options: 'i' } }
          ]
        }).limit(10);
      }
      
      res.json({
        success: true,
        extractedText: text,
        potentialNames,
        matches: searchResults,
        alternatives: alternatives
      });
      
    } catch (error) {
      console.error('OCR Error:', error);
      // Clean up the uploaded file in case of error
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      res.status(500).json({ 
        success: false, 
        message: 'Error processing image',
        error: error.message 
      });
    }
    
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during image upload',
      error: error.message 
    });
  }
};
