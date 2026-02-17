const {Trip} = require('../models');
const { fileUpload } = require('../utils/fileUpload');


const createTrip = async (req, res, next) => {

    const {userId, title,  startDate, endDate, summary} = req.body;

   
    try {

        const exists = await Trip.findOne({title})
        if(exists)
        {
             return res.status(400).json({message: "title already exists"})
        }

         let coverImageUrl = " ";

    if(req.file)
    {
        coverImageUrl = await fileUpload(req.file.path);
        console.log("🚀 ~ createTrip ~ coverImageUrl:", coverImageUrl)
    }

        const trips = await Trip.create({
            userId,
             title,
              coverImage:coverImageUrl, 
              startDate,
               endDate,
                summary
        })
        console.log("🚀 ~ createTrip ~ trips:", trips)

        res.status(201).json(trips);
    } catch (error) {
        next(error);
    }

}

const getAllTrip = async (req,res, next) => {

    try {
        const trips = await Trip.find();

          if(trips.length === 0)
        {
            return res.status(404).json({message:"Not found"})
        }

        res.status(200).json(trips);
    } catch (error) {
        next(error);
    }

}

const updateTrip = async(req, res, next) => {
    const TripId = req.params.id;
  const { title,  startDate, endDate, summary} = req.body; 

    try {

        let coverImageUrl = null;

    if(req.file)
    {
        coverImageUrl = await fileUpload(req.file.path);
    }

        const updatedTrip = await Trip.findByIdAndUpdate(
            TripId,
           { title,  startDate, endDate, summary, 
             ...(coverImageUrl && { coverImage: coverImageUrl})
           },
            {new: true}
        )

        if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }
        res.status(200).json({message:"update successfully", updatedTrip})
    } catch (error) {
        next(error)
    }
}

const deleteTrip = async(req, res, next) => {
    const TripId = req.params.id;
    try {
        const deleteTrip = await Trip.findByIdAndDelete(TripId);

        if (!deleteTrip) {
      return res.status(404).json({ message: "Not found" });
    }

res.status(200).json({message:"trip deleted successfully"})

    } catch (error) {
        next(error)
        
    }
}

module.exports.tripController = {
    createTrip, getAllTrip, updateTrip, deleteTrip
}