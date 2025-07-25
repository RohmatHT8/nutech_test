const { Service } = require('../models');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json({
      status: 0,
      message: 'Sukses',
      data: services
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: 'Terjadi kesalahan',
      error: error.message
    });
  }
};
