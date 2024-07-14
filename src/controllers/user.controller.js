import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const bcryptSalt = bcrypt.genSaltSync(10);

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
export const loginUser = async (req,res) => {
    const {email,password} = req.body;
    console.log("recived email",email);

    const userDoc = await  User.findOne({email});

    if(userDoc)
    {
       const passOk = bcrypt.compareSync(password,userDoc.password)
       if(passOk)
       {
            jwt.sign({
                        id: userDoc._id,
                        email: userDoc.email,
                    },process.env.JWT_SECRET_KEY, {} , 
                    (err,token) => {
                                    if(err)
                                    {
                                        throw err;
                                    }
                                    res.cookie('token',token).json(userDoc);
                                  }
                    )
        // res.cookie('token',process.env.JWT_SECRET_KEY).json("pass ok");

        
       }else{
            return res.status(401).json({ error: "Invalid password" });
       }
    }
    else{
        return res.status(404).json({ error: "User not found" });
    }

}

export const userProfile = async (req,res) => {
    const {token} = req.cookies;
    

    if(token){
        jwt.verify(token,process.env.JWT_SECRET_KEY, async (err,user) => {
            if(err) throw err
            
            const {name,email,id} = await User.findById(user.id)

            res.json({id,name,email});

            })
    }else{
        res.json(null);
    }
}

export const userLogout = async (req,res) => {
    res.cookie('token','').json({message: 'Successfully Logged out'})
}
