const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dqwbvpwz7/image/upload/v1682587581/YelpCamp/rbnmbnqqqwiusoqng9ev.jpg',
                  filename: 'YelpCamp/rbnmbnqqqwiusoqng9ev',
                },
                {
                  url: 'https://res.cloudinary.com/dqwbvpwz7/image/upload/v1682587581/YelpCamp/l3biuouxxffyi1kuhgeo.jpg',
                  filename: 'YelpCamp/l3biuouxxffyi1kuhgeo',
                }
              ],
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque unde reprehenderit adipisci nobis totam nihil molestiae expedita molestias eius quis veniam, soluta in ut deleniti officia, asperiores labore quas et.",
            author:"6448e7fa5c2bb52254eb9dc3",
            price,
            geometry:{
              "type":"Point",
              "coordinates":[
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})