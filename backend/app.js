const express = require('express')
const connectDB = require("./db.js")
const bookRoute = require("./routes/bookRoutes")
const cors = require("cors")
const app = express()
const port = 3001;

app.use(cors())
app.use(express.json());  // This is important for parsing JSON request bodies


connectDB();
app.get('/', (req, res) => {
  res.send('Home')
})
app.use('/api/v1', bookRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})