const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Email is not valid',
      },
      set: (v) => (v ? v.toLowerCase() : v),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
