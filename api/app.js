const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 80;
const connectFunc = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
// route
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
// connect
const connect = async () => {
  try {
    await connectFunc(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connect();
