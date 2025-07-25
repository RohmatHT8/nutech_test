const { Banner } = require('../models');

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.status(200).json({
      status: 0,
      message: 'Sukses',
      data: banners
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: 'Terjadi kesalahan',
      error: error.message
    });
  }
};
