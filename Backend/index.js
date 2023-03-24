const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { auth } = require("./middlewares/auth.middleware");
const { noteRouter } = require("./routes/note.route");
const { userRouter } = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter);

app.listen(3001, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log("Unable to connect to db");
  }
  console.log("Listening at port 3001");
});
