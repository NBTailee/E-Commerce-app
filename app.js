const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const connectFunc = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

// middleware
app.use(morgan("tiny"));
app.use(express.json());

// route
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

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
