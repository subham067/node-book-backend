const connectToMongo = require('./Db');
connectToMongo();
var cors = require('cors')
// var app = express()


const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
 