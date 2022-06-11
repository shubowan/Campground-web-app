const { default: mongoose } = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection
db.on('error', console.error.bind(console,'connection error:'))
db.once('open', ()=>{
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
    await Campground.deleteMany({})
    for(let i=0; i<200; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
            author: '62a0eeb67143d59c46e20c2f',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "斯巴拉西",
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
            },
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dnbtyzydw/image/upload/v1654898077/YelpCamp/iydgu9cdxyai5fcbpsut.jpg',
                  filename: 'YelpCamp/iydgu9cdxyai5fcbpsut',
                },
                {
                  url: 'https://res.cloudinary.com/dnbtyzydw/image/upload/v1654895272/YelpCamp/ddzk76hntrtl2oywzyge.jpg',
                  filename: 'YelpCamp/ddzk76hntrtl2oywzyge',
                },
              ]
        })
        await camp.save()
    }
    
}

seedDb().then(()=>{
    mongoose.connection.close()
})