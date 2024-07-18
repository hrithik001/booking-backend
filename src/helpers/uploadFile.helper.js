import {Cloudinary as cloudinary} from '../utils/cloudnary.utils.js'
import axios from 'axios'

// export  const   upLoadFile = async (filePath) => {
//     try {
//         const result = await cloudnary.uploader.upload(filePath);
//         console.log(result)
//         return result
//     } catch (error) {
//         console.log("failed",error)
//     }
// }




export const uploadByLink = async (req, res) => {
    const { link } = req.body;
    console.log("res details",res)
    try {
        const response = await axios.get(link, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        cloudinary.uploader.upload_stream({ folder: 'booking_backend' }, (error, result) => {
            if (error) {
                return res.status(500).send({ error: error.message });
            }
            res.send({ name: result.public_id });
        }).end(buffer);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


