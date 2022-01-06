const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const { render } = require('express/lib/response')
const { response } = require('express')
const blogRoutes = require('./routes/blogRoutes')

const usersRoutes = require('./routes/userRoutes')

// Connect to database
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

const app = express()

// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(morgan('dev'))
app.use(express.static('public')) // gör så att appen har tillgång till statiska filer i public, dessa är publika och syns offentligt. 
app.use(express.urlencoded({ extended: true})) // Takes all url encoded data and passes it to an object

// Blog Routes
app.use('/blogs', blogRoutes)
app.use('/users/cool', usersRoutes)

// Renderar vyn index som ligger i mappen views
app.get('/', (req, res)=>{
    res.redirect('/blogs')
})

app.get('/about', (req, res)=>{
    res.render('about', { title: 'About' })
})

app.use((req, res)=>{
    res.status(404).render('404', { title: '404' })
}) 