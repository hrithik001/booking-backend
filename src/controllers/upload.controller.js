import imageDownloader from "image-downloader"
import { fileURLToPath } from 'url';
import path from 'path';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = 'D:/my_playground/booking app/api'

export const uploadByLink =  (req,res) => {

    const {link} = req.body;
  try {
    const newName = 'pic' + Date.now() + '.jpg';
    imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });

    res.json({name: newName});

    }catch(err){
        console.log("recived error ",err);
        throw err
    }
} 