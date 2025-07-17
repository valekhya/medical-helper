exports.getLLMExplanation = async (markers) => {
  // Simulated LLM response
  return {
    Hemoglobin: {
      explanation: "Hemoglobin is low, which may indicate anemia.",
      suggestion: "Include iron-rich foods like spinach and lentils."
    },
    FBS: {
      explanation: "Fasting Blood Sugar is high — this may suggest pre-diabetes.",
      suggestion: "Avoid sugar and carbs, and walk daily."
    },
    VitaminD: {
      explanation: "Vitamin D is low, which can cause fatigue and bone pain.",
      suggestion: "Get sunlight exposure and consider supplements."
    }
  };
};


// const axios = require('axios');

// exports.getLLMExplanation = async (markers) => {
//   const prompt = `Explain the following markers simply:\n${JSON.stringify(markers)}\nGive advice for each.`;
//   const res = await axios.post('https://api.openai.com/v1/chat/completions', {
//     model: 'gpt-4o',
//     messages: [{ role: 'user', content: prompt }],
//     temperature: 0.5
//   }, {
//     headers: {
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
//     }
//   });

//   return res.data.choices[0].message.content;
// };
