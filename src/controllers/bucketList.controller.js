const {BucketList , Trip} = require('../models');

const createBucketList = async (req, res, next) => {
    const {tripId, name,quantity, note} = req.body;

    try {
        const trip = await Trip.findById(tripId);

        if(!trip)
        {
            return res.status(400).json({message: "Invalid Trip"});
        }
        const bucket_list = await BucketList.create({
            tripId, name,quantity, note
        })

        res.status(201).json(bucket_list)
    } catch (error) {
        next(error)
    }

}

const getAllBucketList = async (req, res, next) => {
    try {
        const bucket_list = await BucketList.find();

            if(bucket_list.length === 0)
        {
            return res.status(404).json({message:"Not found"})
        }

        res.status(200).json(bucket_list)
    } catch (error) {
        next(error)
    }

}

const getBucketById = async (req, res, next) => {
    const bucketId = req.params.id;
    
    try {
        const bucket_list = await BucketList.findById(bucketId);
        
        if (!bucket_list) {
            return res.status(404).json({message: "Bucket not found"});
        }
        
        res.status(200).json(bucket_list);
    } catch (error) {
        next(error);
    }
}

const updateBucketList = async (req, res, next) => {
    const bucket_list_Id = req.params.id;
       const { name,quantity, note} = req.body;
    try {
        const bucket_list = await BucketList.findByIdAndUpdate(
            bucket_list_Id,
           {name,quantity, note},
            {new: true}
        )
            res.status(200).json({message: "update successfully", bucket_list})
    }

    catch (error) {
        next(error)
    }
}

const deleteBucketList = async (req, res, next) => {
    const bucket_list_Id = req.params.id;
       
    try {
        const bucket_list = await BucketList.findByIdAndDelete(
            bucket_list_Id,
       
        )
        res.status(200).json({message: "delete successfully", bucket_list})
    } catch (error) {
        next(error)
    }
}

module.exports.bucketListController = {
    createBucketList, getAllBucketList, getBucketById, updateBucketList, deleteBucketList
}