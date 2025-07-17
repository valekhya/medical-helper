const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handlePdfUpload } = require('../controllers/pdfController');

const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('file'), handlePdfUpload);

module.exports = router;
