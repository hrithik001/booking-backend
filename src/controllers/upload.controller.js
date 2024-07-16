import imageDownloader from "image-downloader"
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = 'D:/my_playground/booking app/api'

export const uploadByLink = async  (req,res) => {

    const {link} = req.body;
  try {


    const response = await axios.get(link, {
      responseType: 'arraybuffer'
    });
     const contentType = response.headers['content-type'];
    if (!contentType.startsWith('image/')) {
      return res.status(400).json({ error: 'URL does not point to an image' });
    }

    
    const newName = 'pic' + Date.now() + '.jpg';
    imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });

    return res.status(200).json({ message: `Image uploaded successfully and saved as ${newName}` });

    }catch(error){
        
         if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Image not found at the URL' });
        }
    return res.status(500).json({ error: 'An error occurred while fetching the image' });
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