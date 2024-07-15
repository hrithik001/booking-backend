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
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
})

const Place = mongoose.model("Place",placeSchema);
export default Place
