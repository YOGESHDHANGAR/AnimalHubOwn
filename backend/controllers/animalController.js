const Animal = require("../models/animalModel");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const { breedArr, categoryArr, lngArr, latArr } = require("../utils/apiArrays");
let centerPoint = { userLng: 75.8577258, userLat: 22.7195687 };
let defaultRadius = 5;

// Create Animal
exports.createAnimal = catchAsyncErrors(async (req, res, next) => {
  // let images = [];
  // const imagesLinks = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "animals",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  // req.body.images = imagesLinks;
  // req.body.user = req.user.id;
  console.log(req.body);

  const animal = await Animal.create(req.body);

  res.status(201).json({
    success: true,
    animal,
  });
});

// Get All Animal
exports.getAllAnimals = catchAsyncErrors(async (req, res, next) => {
  let user = {};

  //intialiazing default query array
  const arrQuery = [
    {
      $sort: {
        publishedOn: 1,
      },
    },
  ];

  //checking if user is logged in or not
  if (req.query.id) {
    const user = await User.findById(req.query.id);
    centerPoint = { userLng: user.longitude, userLat: user.lattitude };
  }

  //if radius query is been asked
  if (req.query.radius) {
    defaultRadius = req.query.radius;
  }

  const copyLngArr = [...lngArr];
  const copyLatArr = [...latArr];

  let lngRight = centerPoint.userLng + copyLngArr[defaultRadius - 1];
  let lngLeft = centerPoint.userLng - copyLngArr[defaultRadius - 1];
  let latRight = centerPoint.userLat + copyLatArr[defaultRadius - 1];
  let latLeft = centerPoint.userLat - copyLatArr[defaultRadius - 1];

  //if milk querry is there
  if (req.query.milk) {
    var value = req.query.milk;
    arrQuery.push({
      $match: {
        milkCurrent: { $gte: parseInt(value - 5), $lte: parseInt(value) },
      },
    });
  }

  // if category query is there
  if (req.query.category) {
    const copyCategoryArr = [...categoryArr];
    const index = req.query.category;
    if (index >= 0 && index <= 3) {
      arrQuery.push({
        $match: {
          category: copyCategoryArr[index],
        },
      });
    } else {
      arrQuery.push({
        $match: {
          category: {
            $in: [
              "goat",
              "maleGoat",
              "sheep",
              "maleSheep",
              "camel",
              "camelFemale",
              "horse",
              "femaleHorse",
            ],
          },
        },
      });
    }
  }

  //if breed query is there
  if (req.query.breed) {
    const copyBreedArr = breedArr;

    let qry = req.query.breed;
    const queryArr = [];

    let i = 0;
    if (qry.length == 40) {
      for (i = 0; i < 40; i++) {
        if (qry.charAt(i) == 1) {
          queryArr.push(copyBreedArr[i]);
        }
      }
    }

    arrQuery.push({
      $match: {
        breed: {
          $in: queryArr,
        },
      },
    });
  }

  //if rate query is there
  if (req.query.rate) {
    const rate = req.query.rate;
    arrQuery.push({
      $match: {
        rate: { $lte: parseInt(rate) },
      },
    });
  }

  //narrowing animals along longitude
  arrQuery.push({
    $match: {
      longitude: {
        $gte: parseFloat(lngLeft),
        $lte: parseFloat(lngRight),
      },
    },
  });

  //narrowing animals along lattidude
  arrQuery.push({
    $match: {
      lattitude: {
        $gte: parseFloat(latLeft),
        $lte: parseFloat(latRight),
      },
    },
  });

  const animals = await Animal.aggregate(arrQuery);

  //calculating distance of every animal from defaultlocation or if radius and user id is given
  // const distanceControl = (animals) => {
  animals.map((item) => {
    let itemLng = item.longitude;
    let itemLat = item.lattitude;
    let checkPoint = { itemLng, itemLat };

    function findinDistance(checkPoint, centerPoint) {
      let ky = 40000 / 360;
      let kx = Math.cos((Math.PI * centerPoint.userLat) / 180.0) * ky;
      let dx = Math.abs(centerPoint.userLng - checkPoint.itemLng) * kx;
      let dy = Math.abs(centerPoint.userLat - checkPoint.itemLat) * ky;
      item.distance = Math.sqrt(dx * dx + dy * dy).toFixed(3);
    }

    findinDistance(checkPoint, centerPoint);
  });
  // };

  // distanceControl(animals);

  arrQuery.push({ $count: "animalsCount" });
  const animalsCount = await Animal.aggregate(arrQuery);

  res.status(200).json({
    success: true,
    animals,
    animalsCount,
  });
});

// Get Animals  (Admin)
exports.getAdminAnimals = catchAsyncErrors(async (req, res, next) => {
  const animals = await Product.find();

  res.status(200).json({
    success: true,
    animals,
  });
});

// Get Animal Details
exports.getAnimalDetails = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    animal,
  });
});

// Update Animal -- Admin

exports.updateAnimal = catchAsyncErrors(async (req, res, next) => {
  let animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < animal.images.length; i++) {
      await cloudinary.v2.uploader.destroy(animal.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Animal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    animal,
  });
});

// Delete Animal

exports.deleteAnimal = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(new ErrorHandler("Animal not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < animal.images.length; i++) {
    await cloudinary.v2.uploader.destroy(animal.images[i].public_id);
  }

  await animal.remove();

  res.status(200).json({
    success: true,
    message: "Animal Delete Successfully",
  });
});
