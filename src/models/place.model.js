import mongoose from "mongoose"

const placeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address:{
        type: String,
        required: true
    },
    photos: [String],
    description: String,
    perks: [String],
    price: Number,
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
})

const Place = mongoose.model("Place",placeSchema);
export default Place
