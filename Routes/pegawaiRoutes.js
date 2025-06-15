// routes/pegawaiRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const kepegawaianController = require('../Controllers/kepegawaianController');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/photos/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
router.get('/pegawai', kepegawaianController.getAllPegawai);
router.post('/submit-pegawai',upload.single('filepond'),  kepegawaianController.submitPegawai);

module.exports = router;
