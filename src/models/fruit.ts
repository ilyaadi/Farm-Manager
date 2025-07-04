import mongoose, { Schema, models, model } from "mongoose";

const fruitSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
    row: { 
        type: String, 
        required: true 
    },
    collumn: {
         type: Number, 
         required: true 
        },  
    count: { 
        type: Number, 
        required: true 
    },
    date: {
        type: Date,
        required: true 
    },
});

const Fruit = mongoose.models.Fruit || mongoose.model("Fruit", fruitSchema);

export default Fruit;