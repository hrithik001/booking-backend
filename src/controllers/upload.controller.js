import imageDownloader from "image-downloader"
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'
import axios from "axios";

import {uploadByLink} from '../helpers/uploadFile.helper.js'
import { Cloudinary as cloudinary } from "../utils/cloudnary.utils.js";



import express from 'express';
// import  cloudnary from '../utils/cloudnary.utils.js'
import { url } from "inspector";
// import upload from '../middlewares/multer.middleware.js'


export const uploadFiles = async (req, res) => {
    console.log("Request body:", req.body); // Log the entire request body
    const { link } = req.body; 
    if (!link) {
        return res.status(400).send({ success: false, message: "Link is required" });
    }
    try {
        const response = await axios.get(link, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        cloudinary.uploader.upload_stream({ folder: 'your_folder_name' }, (error, result) => {
            if (error) {
                return res.status(500).send({ error: error.message });
            }
            res.send({ name: result.public_id });
        }).end(buffer);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const uploadByFiles = async (req, res) => {
     try {
        const file = req.file;
         if (!file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        console.log("file",file)
        const { path } = file;
        const result = await cloudinary.uploader.upload(path, { folder: 'your_folder_name' });
        res.send({ name: result.public_id });
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        res.status(500).send({ error: error.message });
    }
};







// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const __dirname = 'D:/my_playground/booking app/api'

// export const uploadByLink =  (req,res) => {

//     const {link} = req.body;
//   try {
//     const newName = 'pic' + Date.now() + '.jpg';
//     imageDownloader.image({
//         url: link,
//         dest: __dirname + '/uploads/' + newName,
//     });

//     res.json({name: newName});

//     }catch(err){
//         console.error("Error downloading image:", err);
//         if (err.message.includes('ENOTFOUND') || err.message.includes('404')) {
//             res.status(400).json({ message: "Invalid URL or unable to fetch image" });
//         } else {
//             res.status(500).json({ message: "Internal Server Error", error: err.message });
//         }
//     }
// } 


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