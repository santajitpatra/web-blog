const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    salt: {
      type: "string",
      //   required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    profileImage: {
      type: "string",
      default: "/images/user.png",
    },
    role: {
      type: "string",
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const salt = user.salt;
  const hashPassword = user.password
  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashPassword !== userProvidedHash) throw new Error("Incorrect password");

  //  return {...user, password: undefined, salt: undefined };
  return user;
});

const User = model("User", userSchema);

module.exports = User;
