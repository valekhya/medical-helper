exports.extractTextFromPDF = async (filePath) => {
  // Simulated marker extraction
  return {
    Hemoglobin: { value: 9.5, unit: 'g/dL', status: 'low' },
    FBS: { value: 140, unit: 'mg/dL', status: 'high' },
    VitaminD: { value: 20, unit: 'ng/mL', status: 'low' }
  };
};
