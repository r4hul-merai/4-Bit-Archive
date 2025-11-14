const supabase = require('../config/supabase');

// @desc    Get all medicines
// @route   GET /api/medicines
// @access  Public
exports.getAllMedicines = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('price', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single medicine by ID
// @route   GET /api/medicines/:id
// @access  Public
exports.getMedicineById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching medicine:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search medicines by name, salt, or generic name
// @route   GET /api/medicines/search/:query
// @access  Public
exports.searchMedicines = async (req, res) => {
  try {
    const query = req.params.query.toLowerCase();
    
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .or(`brand_name.ilike.%${query}%,generic_name.ilike.%${query}%,salt.ilike.%${query}%`)
      .order('price', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error searching medicines:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get alternative medicines by salt
// @route   GET /api/medicines/alternatives/:salt
// @access  Public
exports.getAlternativesBySalt = async (req, res) => {
  try {
    const salt = req.params.salt.toLowerCase();
    
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .ilike('salt', `%${salt}%`)
      .order('price', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error finding alternatives:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new medicine
// @route   POST /api/medicines
// @access  Private/Admin
exports.addMedicine = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medicines')
      .insert([{
        brand_name: req.body.brandName,
        generic_name: req.body.genericName,
        salt: req.body.salt,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        strength: req.body.strength,
        form: req.body.form,
        image_url: req.body.imageUrl,
        is_prescription_required: req.body.isPrescriptionRequired || false
      }])
      .select();

    if (error) throw error;
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error adding medicine:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update medicine
// @route   PUT /api/medicines/:id
// @access  Private/Admin
exports.updateMedicine = async (req, res) => {
  try {
    const updates = {
      brand_name: req.body.brandName,
      generic_name: req.body.genericName,
      salt: req.body.salt,
      manufacturer: req.body.manufacturer,
      price: req.body.price,
      strength: req.body.strength,
      form: req.body.form,
      image_url: req.body.imageUrl,
      is_prescription_required: req.body.isPrescriptionRequired,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('medicines')
      .update(updates)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    
    res.json(data[0]);
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete medicine
// @route   DELETE /api/medicines/:id
// @access  Private/Admin
exports.deleteMedicine = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medicines')
      .delete()
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    
    res.json({ message: 'Medicine removed', data: data[0] });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ message: error.message });
  }
};
