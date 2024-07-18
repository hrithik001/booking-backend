import jwt from 'jsonwebtoken'


export const getUserDataFromToken = (req) => {
    return new Promise((resolve,reject) => {
        const token = req.cookies.token;
        if(!token)
        {
            reject(new Error('JWT token not provided'));
        }
        jwt.verify(req.cookies.token , process.env.JWT_SECRET_KEY, {} ,async (err,userData) => {
            if(err) reject(err)
            resolve(userData)
        })
    })
}