const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"]
  }
});

UserSchema.pre("save", async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt );
  next();
})


UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw Error("Incorrect Password");
  }

  throw Error("Incorrect Email");
}

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;