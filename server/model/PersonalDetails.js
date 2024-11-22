// // model/PersonalDetails.js

// const mongoose = require('mongoose');

// const personalDetailSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     dob: { type: Date, required: true },
//     gender: { type: String, required: true },
//     pinCode: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     anotherPhone: { type: String },
//     childImage: { type: String }, image
// });

// const PersonalDetails = mongoose.model('PersonalDetails', personalDetailSchema);

// module.exports = PersonalDetails;

const mongoose = require("mongoose");

const PersonalDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true },
  pinCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  anotherPhone: { type: String },
  image: { type: String, required: true }, // Path to the uploaded image
});

module.exports = mongoose.model("PersonalDetails", PersonalDetailsSchema);
