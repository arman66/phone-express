const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const phoneSchema = new Schema(
  {
      brand: {
          type: String,
          required: [true, "Brand is required"]
      },
      name: {
          type: String,
          required: [true, "Name is required"]
      },
      image: {
          type: String,
          default: '/images/default-phone.gif'
      },
      specs: [
          { type: String }
      ]
  },

  {
      timestamps: true
  }
);

const Phone = mongoose.model("Phone", phoneSchema);


module.exports = Phone;
