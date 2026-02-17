const {v2 : cloudinary} = require('cloudinary')
const fs = require('fs')

const fileUpload = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" 
        })

        //file has been uploaded successfull

        console.log("file is uploaded on cloudinary", response.url)
        return response.secure_url
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the upload failed
        console.log("🚀 ~ upload ~ error:", error)
        return null;
    }
}

 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


module.exports = { fileUpload };