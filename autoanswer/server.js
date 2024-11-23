// Import library yang diperlukan
const express = require('express');
const axios = require('axios');
require('dotenv').config();  // Untuk memuat environment variables dari file .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk menerima permintaan dari ekstensi dan memberikan jawaban dari API
app.post('/answer', async (req, res) => {
  const userQuery = req.body.query;  // Mendapatkan query dari body permintaan
  
  try {
    // Membuat permintaan ke API (misalnya OpenAI GPT-3)
    const response = await axios.post(
      'https://api.openai.com/v1/completions',  // Ganti dengan endpoint yang sesuai
      {
        model: 'gpt-3.5-turbo',  // Bisa diganti dengan model yang kamu inginkan
        prompt: userQuery,  // Mengirim query pengguna
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`, // Menggunakan API key dari .env
          'Content-Type': 'application/json',
        },
      }
    );
    // Mengirimkan hasil dari API kembali ke klien
    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
