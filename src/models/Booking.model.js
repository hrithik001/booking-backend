import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    bookingFrom:{
        type: Date,
        required: true
    },
    bookingTo:{
        type: Date,
        required: true
        },
    numberOfGuests:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    place:{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    }

})

const Booking = mongoose.model("Booking",bookingSchema);
export default Booking


