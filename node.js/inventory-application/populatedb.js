#! /usr/bin/env node

console.log(
  'This script populates some test articles to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Article = require("./models/article");
const Brand = require("./models/brand");
const Category = require("./models/category");

const articles = [];
const brands = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createBrands();  
  await createArticles();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function brandCreate(index, name, year_foundation) {
  const brand = new Brand({ name: name });
  
  if (year_foundation != false) brand.year_foundation = year_foundation;
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function categoryCreate(index, name, description) {
  const categoryDetail = { name: name, description: description};

  const category = new Category(categoryDetail);

  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function articleCreate(index, name, description, price, brand, category) {
  const articleDetail = {
    name: name,
    description: description,
    price: price,
  };
  if (brand != false) articleDetail.brand = brand;
  if (category != false) articleDetail.category = category;

  const article = new Article(articleDetail);
  await article.save();
  articles[index] = article;
  console.log(`Added article: ${name}`);
}



async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, "Apple", 1976),
    brandCreate(1, "Nike", 1964),
    brandCreate(2, "Keurig", 1992),
    brandCreate(3, "The North Face", 1966),
    brandCreate(4, "Neutrogena", 1930),
    brandCreate(5, "Purina", 1894),
    brandCreate(6, "IKEA", 1943),
    brandCreate(7, "Fender", 1946),
    brandCreate(8, "Canon", 1937),
    brandCreate(9, "Anthropologie", 1992)
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Electronics", "Devices and appliances that utilize electrical circuits."),
    categoryCreate(1, "Sports Equipment", "Equipment and gear for various sports and physical activities."),
    categoryCreate(2, "Kitchen Appliances", "Appliances used in food preparation and cooking."),
    categoryCreate(3, "Travel Accessories", "Accessories and gear for travel and outdoor adventures."),
    categoryCreate(4, "Beauty Products", "Products for skincare, makeup, and personal grooming."),
    categoryCreate(5, "Pet Supplies", "Supplies and products for the care and well-being of pets."),
    categoryCreate(6, "Home Decor", "Decorative items and furnishings for the home."),
    categoryCreate(7, "Musical Instruments", "Instruments used to create music and perform musical compositions.")

  ]);
}

async function createArticles() {
  console.log("Adding Articles");
  await Promise.all([
    articleCreate(
      0,
      "Smartphone",
      "A high-end smartphone with advanced features.",
      1000,
      brands[0], // Apple
     [categories[0]] // Electronics
    ),
    articleCreate(
      1,
      "Running Shoes",
      "High-performance running shoes designed for athletes.",
      150,
      brands[1], // Nike
      [categories[1]] // Sports Equipment
    ),
    articleCreate(
      2,
      "Coffee Maker",
      "An efficient coffee maker that brews delicious coffee in minutes.",
      80,
      brands[2], // Keurig
      [categories[2]] // Kitchen Appliances
    ),
    articleCreate(
      3,
      "Backpack",
      "A durable and spacious backpack for outdoor adventures.",
      120,
      brands[3], // The North Face
      [categories[3] ]// Travel Accessories
    ),
    articleCreate(
      4,
      "Sunscreen",
      "A broad-spectrum sunscreen with SPF 50 for maximum protection.",
      15,
      brands[4], // Neutrogena
     [categories[4]] // Beauty Products
    ),
    articleCreate(
      5,
      "Dog Food",
      "Nutritious dog food formulated to support overall health and vitality.",
      30,
      brands[5], // Purina
      [categories[5]] // Pet Supplies
    ),
    articleCreate(
      6,
      "Desk Lamp",
      "A stylish and functional desk lamp for brightening up your workspace.",
      50,
      brands[6], // IKEA
      [categories[6]] // Home Decor
    ),
    articleCreate(
      7,
      "Acoustic Guitar",
      "A high-quality acoustic guitar with rich tones and excellent playability.",
      500,
      brands[7], // Fender
      [categories[7]] // Musical Instruments
    ),
    articleCreate(
      8,
      "Digital Camera",
      "A professional-grade digital camera with advanced features for photography enthusiasts.",
      1200,
      brands[8], // Canon
      [categories[0]] // Electronics
    ),
    articleCreate(
      9,
      "Throw Pillow",
      "Decorative throw pillow with unique patterns to add flair to your living space.",
      25,
      brands[9], // Anthropologie
      [categories[6]] // Home Decor
    )
  ]);
}


