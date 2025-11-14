const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Get all medicines
router.get('/', medicineController.getAllMedicines);

// Get medicine by ID
router.get('/:id', medicineController.getMedicineById);

// Search medicines by name, salt, or generic name
router.get('/search/:query', medicineController.searchMedicines);

// Get alternatives by salt
router.get('/alternatives/:salt', medicineController.getAlternativesBySalt);

// Add new medicine (Admin only)
router.post('/', medicineController.addMedicine);

// Update medicine (Admin only)
router.put('/:id', medicineController.updateMedicine);

// Delete medicine (Admin only)
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
