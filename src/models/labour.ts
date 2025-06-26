import mongoose, { Schema, models, model } from "mongoose";

const labourSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Please provide a date"],
  },
  shift: {
    type: String,
    enum: ['half', 'full'], 
    required: [true, "Please provide a shift"],
  },
  name: {
    type: String,
    enum: ['sushil', 'amit'], 
    required: [true, "Please provide a name"],
  },
});

const Labour = models.Labour || model("Labour", labourSchema);
export default Labour;
