import Place from "../models/place.model.js"
import jwt from 'jsonwebtoken'
import Booking from "../models/Booking.model.js";
import {getUserDataFromToken} from '../utils/getUserData.utils.js'

export const addNewPlace = async (req,res) => {
    // const {token} = req.cookies;
    // if(!token) throw error({message: "Log in"})
    const {title,description,address,addedphotos,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    // jwt.verify(token,process.env.JWT_SECRET_KEY, async (err,user) => {
    //     if(err) throw err
        const userData = await getUserDataFromToken(req);

        if(!userData) return res.status(401).json({message: "You need to login"})
          
        try {
            const placeDoc = await Place.create({
                owner: userData.id,
                photos: addedphotos,
                title,
                description,
                address,
                perks,
                extraInfo,
                checkIn,
                price,
                checkOut,
                maxGuests
            })

            
            res.json({placeDoc});

        } catch (error) {
             console.error("Error adding new place:", error);
             res.status(500).json({ message: "Failed to add new place" });
        }
            

    

   
}

export const getAllPlaces = async (req,res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (error) {
        console.error("Error fetching all places:", error);
        res.status(500).json({ message: "Failed to fetch places" });
    }
}

export const getUserPlaces = async (req,res) => {
     try {
        const userData = await getUserDataFromToken(req);
        if (!userData) {
            return res.status(401).json({ message: "You need to login" });
        }
        const userPlaces = await Place.find({ owner: userData.id });
        res.json(userPlaces);
    } catch (error) {
        console.error("Error fetching user places:", error);
        res.status(500).json({ message: "Failed to fetch user places" });
    }
}


export const getSinglePlace = async (req,res) => {
     try {
        const { id } = req.params;
        const place = await Place.findById(id);
        res.json(place);
    } catch (error) {
        console.error("Error fetching single place:", error);
        res.status(500).json({ message: "Failed to fetch place" });
    }
}

export const updatePlaceData = async (req,res) => {

    try{
      const {id} = req.params;
      const {token} = req.cookies;
    if(!token) throw new Error("User not authenticated");

    const {title,description,address,addedphotos,perks,extraInfo,checkIn,price,checkOut,maxGuests} = req.body;

    

     jwt.verify(token,process.env.JWT_SECRET_KEY, async (err,{id:userId}) => {
        if(err) throw err   
        const placeDoc = await Place.findById(id);
        if(userId === placeDoc.owner.toString())
        {
            placeDoc.set({
                title,
                description,
                address,
                photos: addedphotos,
                perks,
                extraInfo,
                checkIn,
                price,
                checkOut,
                maxGuests
            })
            placeDoc.save();
            res.json({
                message: "Place updated successfully",
                place: placeDoc
            })
        }

     })
    }
    catch(err){
        console.error("Error updating place:", error);
        res.status(500).json({ message: "Failed to update place" });
    }


      
}

export const bookPlace = async (req,res) => {
     try {
        const {name,bookingFrom,bookingTo,address,phoneNumber,placeId,numberOfGuests,totalPrice} = req.body;
        const userData = await getUserDataFromToken(req);
   
       
        const response = await Booking.create({
            name,
            user:userData.id,
            bookingFrom,
            bookingTo,
            address,
            phoneNumber,
            place:placeId,
            numberOfGuests,
            totalPrice

        })

        res.json(response)
    } catch (error) {
        console.error("Error booking place:", error);
        res.status(500).json({ message: "Failed to book place" });
    }
}


export const getBookings = async (req,res) => {
    try {
        console.log("inside fetching function")
        const userData = await getUserDataFromToken(req);
        res.json(await Booking.find({user: userData.id}).populate('place'));
        console.log("completed fetched data")
    }catch(error){
         console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Failed to fetch bookings" });
    }

}

export const getBookingDetails = async (req,res) => {
    try {
      const {id} = req.params;
     const userData = await getUserDataFromToken(req);
    const booking = await Booking.findOne({ _id: id, user: userData.id }).populate('place');
        res.json(booking);
    }catch(error){
         console.error("Error fetching booking details:", error);
        res.status(500).json({ message: "Failed to fetch booking details" });
    }
}
