const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();


// Enable CORS for requests
app.use(cors());

async function sendMessgae(message) {
 const model = await genAI.getGenerativeModel({model:"gemini-pro"})
 const data = await model.generateContent(message)
 return data;
}

app.use(express.json())
app.post('', (req, res) => {
  let message = req.body.message;
  sendMessgae(message).then((data)=>{
    console.log(data);
    res.send({ 
      user: 'server',
      message: data.response.text()
     });
  });
 
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(4000, () => {

  console.log('App running on port 4000');
});


