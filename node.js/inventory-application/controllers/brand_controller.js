const Article = require("../models/article");
const Category = require("../models/category");
const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.list = asyncHandler(async (req, res, next) => {
  const list = await Brand.find({}, "name year_foundation")
    .sort({ name: 1 })
    .exec();
  res.render("brand_list", {
    title: "Brands",
    brand_list: list,
  });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const [brand, articles] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Article.find({ brand: req.params.id }).exec(),
  ]);

  res.render("brand_detail", {
    title: "Brand",
    brand: brand,
    articles: articles,
  });
});

exports.create_get = (req, res, next) => {
  res.render("brand_form", { title: "Create new brand" });
};

exports.create_post = [
  // Validate and sanitize the name field.
  body("name", "Name too short or too long")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("date", "Must be a number")
    .optional({ values: "falsy" })
    .isNumeric()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const brand = new Brand({
      name: req.body.name,
      year_foundation:
        typeof req.body.year_foundation === undefined
          ? ""
          : req.body.year_foundation,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("brand_form", {
        title: "Create Brand",
        brand: brand,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const brandExists = await Brand.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (brandExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(brandExists.url);
      } else {
        await brand.save();
        // New genre saved. Redirect to genre detail page.
        res.redirect(brand.url);
      }
    }
  }),
];

exports.delete_get = asyncHandler(async (req, res, next) => {
  const [brand, allArticlesByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Article.find({ brand: req.params.id }, "name description").exec(),
  ]);

  if (brand === null) {
    // No results.
    res.redirect("/catalog/brands");
  } else {
    res.render("brand_delete", {
      title: "Delete Brand",
      brand: brand,
      brand_articles: allArticlesByBrand,
    });
  }
});

exports.delete_post = asyncHandler(async (req, res, next) => {
  const [brand, allArticlesByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Article.find({ brand: req.params.id }, "name description").exec(),
  ]);

  if (allArticlesByBrand.length > 0) {
    res.render("author_delete", {
      title: "Delete Brand",
      brand: brand,
      brand_articles: allArticlesByBrand,
    });
    return;
  } else {
    await Brand.findByIdAndDelete(req.body.brandid);
    res.redirect("/catalog/brands");
  }
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();
  if (brand === null) {
    // No results.
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }
  res.render("brand_form", {
    title: "Update Brand",
    brand: brand,
  });
});

// Handle Author update on POST.
exports.update_post = [
  body("name", "Name too short or too long")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("date", "Must be a number")
    .optional({ values: "falsy" })
    .isNumeric()
    .toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors", errors);
    const brand = new Brand({
      name: req.body.name,
      year_foundation:
        typeof req.body.year_foundation === undefined
          ? ""
          : req.body.year_foundation,
          _id: req.params.id
    });

    if (!errors.isEmpty()) {
      console.log("an error");
      res.render("brand_form", {
        title: "Update Brand",
        brand:brand,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        brand,
        {}
      );
      res.redirect(updatedBrand.url);
    }
  }),
];
