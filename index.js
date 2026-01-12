const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./Services/ConnectDb");
const app = express();
const { routes } = require("./Routes/Routes");
const { generateHash } = require("./Utils/BCrypt");

dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;
const URI = process.env.MONGO_URI;

connectDb(URI);

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// const fun = async () => {
//   const pass = await generateHash("123456");
//   console.log(pass);
// };
// fun();

generateHash;

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}/`);
  });
}

module.exports = app;
