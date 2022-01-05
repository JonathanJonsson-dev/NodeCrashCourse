const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { render } = require('express/lib/response')
const { response } = require('express')

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

// Routes
// Renderar vyn index som ligger i mappen views
app.get('/', (req, res)=>{
    res.redirect('/blogs')
})

app.get('/about', (req, res)=>{
    res.render('about', { title: 'About' })
})

// blog routes
app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1}).then((result)=>{
        res.render('index', { title: 'All Blogs', blogs: result })
    }).catch((err)=>{
        console.log(err)
    })
})

app.post('/blogs', (req,res)=>{
    const blog = new Blog(req.body)
    blog.save().then((result)=>{
        res.redirect('/blogs')
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/blogs/:id', (req,res)=>{
    const id = req.params.id
    Blog.findById(id).then((result)=>{
        res.render('details', {blog: result, title: 'Blog details'})
    }).catch((err)=>{
        console.log(err)
    })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/blogs/create', (req,res)=>{
    res.render('create', { title: 'Create a new blog' })
})

app.use((req, res)=>{
    res.status(404).render('404', { title: '404' })
}) 