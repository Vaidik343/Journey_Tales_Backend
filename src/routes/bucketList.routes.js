const { bucketListController } = require("../controllers/bucketList.controller");
const express = require('express');

const { apiLimiter } = require("../middleware/rateLimiter");
const { bucketlistValidations } = require("../validations/bucketlist.validations");
const validate = require("../middleware/validate");

const router = express.Router();

router.post('/bucketlist',
    apiLimiter, 
    bucketlistValidations.createBucketListValidations, 
    validate ,
    bucketListController.createBucketList);

router.get('/bucketlist', 
    apiLimiter, 
    bucketListController.getAllBucketList);
    
router.put('/bucketlist/:id',
    apiLimiter, 
    bucketlistValidations.updateBucketListValidations, 
    validate ,
    bucketListController.updateBucketList);

router.delete('/bucketlist/:id', apiLimiter,
     bucketlistValidations.deleteBucketListValidations, 
     validate ,
      bucketListController.deleteBucketList);

module.exports = router;
