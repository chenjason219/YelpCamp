const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');

//usually its 'mongodb://localhost:27017/yelp-camp' BUT
//we use 127.0.0.1 if it doesnt connect
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //YOUR USER ID
            author: '637adb1c4e5d190f7f952314',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil laboriosam quae voluptates exercitationem, quis eveniet, id fugit cum obcaecati, unde at temporibus maxime expedita repellendus harum in culpa illum hic?',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dxkdg1ead/image/upload/v1669250933/YelpCamp/arsukbt5puitecehsyht.jpg',
                  filename: 'YelpCamp/arsukbt5puitecehsyht.jpg'
                },
                {
                  url: 'https://res.cloudinary.com/dxkdg1ead/image/upload/v1669682466/YelpCamp/lywmc93xzprcd0prbcuc.jpg',
                  filename: 'YelpCamp/lywmc93xzprcd0prbcuc.jpg'
                }
              ]
        })
        await camp.save();
    }
}

seedDB()
.then(() => {
    mongoose.connection.close();
})