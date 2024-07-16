import Place from "../models/place.model.js"
import jwt from 'jsonwebtoken'
import Booking from "../models/Booking.model.js";
import {getUserDataFromToken} from '../utils/getUserData.utils.js'

export const addNewPlace = async (req,res) => {
    const {token} = req.cookies;
    if(!token) throw error({message: "Log in"})
    const {title,description,address,addedphotos,perks,extraInfo,checkIn,checkOut,maxGuests} = req.body;
    jwt.verify(token,process.env.JWT_SECRET_KEY, async (err,user) => {
        if(err) throw err
          
        try {
            const placeDoc = await Place.create({
                owner: user.id,
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

            console.log("newPLace ",placeDoc)
            res.json({placeDoc});

        } catch (error) {
            
        }
            

    })

   
}

export const getAllPlaces = async (req,res) => {
    //  const {token} = req.cookies;
    // if(!token) throw error({message: "Log in"})
    //  jwt.verify(token,process.env.JWT_SECRET_KEY, async (err,user) => {
    //     if(err) throw err

    //     const {id} = user;

    //     res.json(await Place.find({owner: id}))



    //  })
    res.json(await Place.find())
}

export const getUserPlaces = async (req,res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await Place.find({owner: userData.id}));
}


export const getSinglePlace = async (req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
}

export const updatePlaceData = async (req,res) => {
      const {id} = req.params;
      const {token} = req.cookies;
    if(!token) throw error({message: "Log in"})

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

export const bookPlace = async (req,res) => {
    const {name,bookingFrom,bookingTo,address,phoneNumber,placeId,numberOfGuests,totalPrice} = req.body;
     const userData = await getUserDataFromToken(req);
    try {
       
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
        console.log("place not booking",error);
        throw error;
    }
}


export const getBookings = async (req,res) => {
    console.log("inside fetching function")
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({user: userData.id}).populate('place'));
    console.log("completed fetched data")

}

export const getBookingDetails = async (req,res) => {
      const {id} = req.params;
     const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({user: userData.id,_id: id}).populate('place'));
}
