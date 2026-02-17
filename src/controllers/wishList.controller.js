const {WishList , Trip} = require('../models');

const createWishList = async (req, res, next) => {
    const {tripId, name, note} = req.body;

    try {
        const trip = await Trip.findById(tripId);

        if(!trip)
        {
            return res.status(400).json({message: "Invalid Trip"});
        }
        const wishlist = await WishList.create({
            tripId, name, note
        })

        res.status(201).json(wishlist)
    } catch (error) {
        next(error)
    }

}

const getAllWishList = async (req, res, next) => {
    try {
        const wishlist = await WishList.find();

            if(wishlist.length === 0)
        {
            return res.status(404).json({message:"Not found"})
        }

        res.status(200).json(wishlist)
    } catch (error) {
        next(error)
    }

}

const updateWishlist = async (req,res,next) => {
    console.log("🚀 ~ updateWishlist ~ updateWishlist:", req.body)
    const wishlistId = req.params.id;
       console.log("🚀 ~ updateWishlist ~ wishlistId:", wishlistId)
       const { name, note} = req.body;
    try {
        const wishlist = await WishList.findByIdAndUpdate(
            wishlistId,
           {name, note},
            {new: true}
        )
            console.log("🚀 ~ updateWishlist ~ wishlist:", wishlist)
            res.status(200).json({message: "update successfully", wishlist})
    }

    catch (error) {
        next(error)
    }
}


const deleteWishlist = async (req,res,next) => {
    const wishlistId = req.params.id;
       
    try {
        const wishlist = await WishList.findByIdAndDelete(wishlistId)
        
        if (!wishlist) {
      return res.status(404).json({ message: "Not found" });
    }
        res.status(200).json({message: "delete successfully", wishlist})
    } catch (error) {
        next(error)
    }
}

module.exports.wishlistController = {
    createWishList, getAllWishList, updateWishlist, deleteWishlist
}