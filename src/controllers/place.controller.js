import Place from "../models/place.model.js"
import jwt from 'jsonwebtoken'


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
                checkOut,
                maxGuests
            })

            console.log("newPLace ",placeDoc)
            res.json({placeDoc});

        } catch (error) {
            
        }
            

    })

   
}

//  title:{
//         type: String,
//         required: true
//     },
//     owner:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     address:{
//         type: String,
//         required: true
//     },
//     photos: [String],
//     descriptions: String,
//     perks: [String],
//     extraInfo: String,
//     checkIn: Number,
//     checkOut: Number,
//     maxGuests: Number,