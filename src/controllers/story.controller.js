const {Story, Trip} = require('../models');
const { fileUpload } = require('../utils/fileUpload');

// couldanry setup for video upload
const createStories = async (req, res, next) => {
    const {tripId, placeName,  story,visitDate} = req.body;

 

    try {
        const trip = await Trip.findById(tripId)
        console.log("🚀 ~ createStories ~ trip:", trip)

        if(!trip)
        {
            return res.status(400).json({message: "Invalid Trip"})
        }
    
        //exits
        const exist = await Story.findOne({tripId ,placeName})

        if(exist)
        {
            return res.status(400).json({message:"Place already exist in this trip!"})
        }

let imageUrls = [];
console.log("🚀 ~ createStories ~ imageUrls:", imageUrls)


if (req.files && req.files.length > 0) {

  for (const file of req.files) {

    const url = await fileUpload(file.path);
   
    imageUrls.push(url); 
  }
}



        //create
        const stories = await Story.create({
            tripId, placeName, images:imageUrls, story,visitDate
        })
        console.log("🚀 ~ createStories ~ stories:", stories)

         res.status(200).json(stories)
    } catch (error) {
        next(error)
        
    }

}

const getAllStories = async (req, res, next) => {
    try {
        const stories = await Story.find();

        if(stories.length === 0)
        {
            return res.status(404).json({message:"Not found!"});
        }

        res.status(200).json(stories);
    } catch (error) {
        next(error);
        
    }
}

const updateStories = async (req, res, next) => {
    
    const storiesId = req.params.id;
    const { placeName,  story,visitDate} = req.body;
    try {
        const updated = await Story.findByIdAndUpdate(
            storiesId,
             { placeName, story,visitDate},
             {new:true}
        )
        res.status(200).json({message:"Update successfully", updated})
    } catch (error) {
        next(error)
    }
}

const deleteStories = async (req, res, next) => {
    
    const storiesId = req.params.id;

    try {
        const deleted = await Story.findByIdAndDelete(
            storiesId,
        )

        res.status(200).json({message:"delete successfully", deleted})
    } catch (error) {
        next(error)
    }
}

module.exports.storyController = {createStories, getAllStories, updateStories, deleteStories}