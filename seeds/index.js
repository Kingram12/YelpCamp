const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
for(let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
        author: '60c290ff76551d4c7cad125e',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: ' Lorem ipsum dolor sit amet consectetur adipisicing ',
        price, 
        geometry: {
            type: 'Point',     
            coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude 
            ] },
        images:  [
            {
              url: 'https://res.cloudinary.com/dufrcvcwh/image/upload/v1623599794/YelpCamp/d2b5kalezy6iydofob0u.jpg',
              filename: 'YelpCamp/d2b5kalezy6iydofob0u'
            },
            {
              url: 'https://res.cloudinary.com/dufrcvcwh/image/upload/v1623599794/YelpCamp/igehfqba4akggwjqfbzw.jpg',
              filename: 'YelpCamp/igehfqba4akggwjqfbzw'
            }
          ]
    })
    await camp.save();
}
}

seedDB().then(()=> {
    mongoose.connection.close();
})