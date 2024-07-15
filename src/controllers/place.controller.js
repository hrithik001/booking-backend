import Place from "../models/place.model.js"
import jwt from 'jsonwebtoken'
import Booking from "../models/Booking.model.js";

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
     const {token} = req.cookies;
    if(!token) throw error({message: "Log in"})
     jwt.verify(token,process.env.JWT_SECRET_KEY, async (err,user) => {
        if(err) throw err

        const {id} = user;

        res.json(await Place.find({owner: id}))



     })
}

export const getUserPlaces = async (req,res) => {
    res.json(await Place.find());
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
    try {
        // const placeDoc = await Place.findById(placeId);
        const response = await Booking.create({
            name,
            bookingFrom,
            bookingTo,
            address,
            phoneNumber,
            place:placeId,
            numberOfGuests,
            totalPrice

        })

        res.json({bookingDetails: response})
    } catch (error) {
        console.log("place not booking",error);
        throw error;
    }
}
