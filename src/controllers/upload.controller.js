import imageDownloader from "image-downloader"
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'



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
        console.error("Error downloading image:", err);
        if (err.message.includes('ENOTFOUND') || err.message.includes('404')) {
            res.status(400).json({ message: "Invalid URL or unable to fetch image" });
        } else {
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    }
} 


// export const uploadByFile = (res,req) => {
//     const upLoadedFiles = [];
//     for(let i = 0;i < req.files?.length ; i++)
//     {
//         const {path , originalname} = req.files[i];
//         const parts = originalname.spilt('.');
//         const ext = parts[parts.length - 1];
//         const newPath = path + '.' + ext;
//         fs.renameSync(path,newPath);
//         upLoadedFiles.push(newPath.replace('uploads/'))

//     }

//     res.json(upLoadedFiles)

//     console.log(res.files);


// }