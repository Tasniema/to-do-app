const UserModel = require('../models/user');
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
   return jwt.sign({ id }, "Reem Janina super secret key", {
    expiresIn: maxAge,
   });
}

const handleErrors = (err) => {
   let errors = {email:"", password: ""}

   if(err.message === "Incorrect Email")
    errors.email = "This Email is not registered!"

    if(err.message === "Incorrect Password")
    errors.password = "This password is not correct!"

   if(err.code === 11000){
    errors.email = "Email Already registered"
    return errors;
   }

   if(err.message.includes("users validation failed")){
    Object.values(err.errors).forEach((properties) => {
        errors[properties.path] = properties.message;
    })
   }

   return errors;
}

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user =   await UserModel.create({ email, password })
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    })

    res.status(201).json({ user: user._id, created: true})
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user =   await UserModel.login( email, password )
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    })

    res.status(200).json({ user: user._id, created: true})
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }

}
