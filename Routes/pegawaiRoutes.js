// routes/pegawaiRoutes.js
const express = require('express');
const router = express.Router();
const kepegawaianController = require('../Controllers/kepegawaianController');

router.get('/pegawai', kepegawaianController.getAllPegawai);
router.post('/submit-pegawai', kepegawaianController.submitPegawai);

module.exports = router;
