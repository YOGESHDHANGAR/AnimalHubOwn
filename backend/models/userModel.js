const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "नाम आवश्यक "],
    // maxLength: [30, "कृपया 30 अक्षरों  से छोटा  नाम लिखे "],
    // minLength: [3, "कृपया 3 अक्षरों  से बड़ा नाम लिखे "],
  },
  mobileNumber: {
    type: Number,
    required: [true, "मोबाइल नंबर आवश्यक"],
    // maxLength: [10, "मोबाइल नंबर अमान्य !"],
  },

  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  userAnimals: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Animal",
      // required: true,
    },
  ],
  userCalls: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Animal",
      // required: true,
    },
  ],
  place: {
    type: String,
    default: "Indore",
  },
  pinCode: {
    type: Number,
    default: 452001,
  },
  lattitude: {
    type: Number,
    default: 22.7195687,
  },
  longitude: {
    type: Number,
    default: 75.8577258,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// // Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
