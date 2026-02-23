const { bucketListController } = require("../controllers/bucketList.controller");
const express = require('express');

const { apiLimiter } = require("../middleware/rateLimiter");
const { bucketlistValidations } = require("../validations/bucketlist.validations");
const validate = require("../middleware/validate");
const { useAuth } = require("../middleware/auth");

const router = express.Router();

router.post('/bucketlist',
    apiLimiter,
    useAuth,
    bucketlistValidations.createBucketListValidations, 
    validate ,
    bucketListController.createBucketList);

router.get('/bucketlist', 
    apiLimiter,
    useAuth,
    bucketListController.getAllBucketList);

router.get('/bucketlist/:id',
    apiLimiter,
    useAuth,
    bucketListController.getBucketById);
    
router.put('/bucketlist/:id',
    apiLimiter,
    useAuth, 
    bucketlistValidations.updateBucketListValidations, 
    validate ,
    bucketListController.updateBucketList);

router.delete('/bucketlist/:id', apiLimiter,
    useAuth,
     bucketlistValidations.deleteBucketListValidations, 
     validate ,
      bucketListController.deleteBucketList);

module.exports = router;
