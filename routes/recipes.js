var express = require("express");
var router = express.Router();
var Recipe = require("../models/recipe");
var middleware = require("../middleware");
var multer = require("multer");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dkgiubohc",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// INDEX - show all recipes
router.get("/", function(req, res) {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    // Get all recipes from DB
    Recipe.find({ name: regex }, function(err, allRecipes) {
      if (err) {
        console.log(err);
      } else {
        if (allRecipes.length < 1) {
          req.flash("error", "No results are matching your search request.");
          return res.redirect("back");
        }
        res.render("recipes/index", { recipes: allRecipes });
      }
    });
  } else {
    // Get all recipes from DB
    Recipe.find({}, function(err, allRecipes) {
      if (err) {
        console.log(err);
      } else {
        res.render("recipes/index", { recipes: allRecipes });
      }
    });
  }
});

// CREATE - add new recipe to DB
router.post("/", middleware.isLoggedIn, upload.single("image"), function(
  req,
  res
) {
  cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("back");
    }
    // add cloudinary url for the image to the recipe object under image property
    req.body.recipe.image = result.secure_url;
    // add image's public_id to recipe object
    req.body.recipe.imageId = result.public_id;
    // add author to recipe
    req.body.recipe.author = {
      id: req.user._id,
      username: req.user.username
    };
    req.body.recipe.price = result.price;
    Recipe.create(req.body.recipe, function(err, recipe) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      res.redirect("/recipes/" + recipe.id);
    });
  });
});

// NEW - show form to create new recipe
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("recipes/new");
});

// SHOW - shows more info about one recipe
router.get("/:id", function(req, res) {
  // find the recipe with provided ID
  Recipe.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundRecipe) {
      if (err || !foundRecipe) {
        req.flash("error", "Recipe not found!");
        res.redirect("back");
      } else {
        // console.log(foundRecipe)
        // render show template with that recipe
        res.render("recipes/show", { recipe: foundRecipe });
      }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkRecipeOwnership, function(req, res) {
  Recipe.findById(req.params.id, function(err, foundRecipe) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that recipe
      res.render("recipes/edit", { recipe: foundRecipe });
    }
  });
});

// UPDATE CAMPGROUND ROUTE
router.put(
  "/:id",
  middleware.checkRecipeOwnership,
  upload.single("image"),
  function(req, res) {
    Recipe.findById(req.params.id, async function(err, recipe) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        if (req.file) {
          try {
            await cloudinary.v2.uploader.destroy(recipe.imageId);
            var result = await cloudinary.v2.uploader.upload(req.file.path);
            recipe.imageId = result.public_id;
            recipe.image = result.secure_url;
          } catch (err) {
            req.flash("error", err.message);
            return res.redirect("back");
          }
        }
        recipe.name = req.body.recipe.name;
        recipe.description = req.body.recipe.description;
        recipe.save();
        req.flash("success", "Successfully Updated!");
        res.redirect("/recipes/" + recipe._id);
      }
    });
  }
);

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkRecipeOwnership, function(req, res) {
  Recipe.findById(req.params.id, async function(err, recipe) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("back");
    }
    try {
      await cloudinary.v2.uploader.destroy(recipe.imageId);
      recipe.remove();
      req.flash("success", "Recipe deleted successfully!");
      res.redirect("/recipes");
    } catch (err) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
    }
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
