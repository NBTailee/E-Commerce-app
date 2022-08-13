const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      minLength: [8, "username must be over 8 chars"],
      require: true,
      unique: true,
      maxLength: [30, "username cannot be longer than 30 chars"],
    },
    password: {
      type: String,
      trim: true,
      minLength: [8, "password must be over 8 chars"],
      require: true,
      unique: true,
    },
    email: {
      type: String,
      minLength: [8, "email must be over 8 chars"],
      require: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
