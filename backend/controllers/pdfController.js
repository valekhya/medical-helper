const { extractTextFromPDF } = require('../services/textractService');
const { getLLMExplanation } = require('../services/llmService');

exports.handlePdfUpload = async (req, res) => {
  try {
    const file = req.file;
    const markers = await extractTextFromPDF(file.path);
    const llmResponse = await getLLMExplanation(markers);
    res.json({ result: llmResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Processing failed' });
  }
};
