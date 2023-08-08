const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { protect } = require("./middleware/authMiddleware");
const connectDB = require("./config/db");
// connect database
connectDB();

//initialoize express()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use(protect);
app.use("/api/todos", require("./routes/goalRoute"));



// liste at 5000 port
app.listen(port, () => console.log(`Server started at Port ${port}.`));
