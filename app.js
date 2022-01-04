const express = require('express')
const app = express()

// register view engine
app.set('view engine', 'ejs')

app.listen(3000)

// Renderar vyn index som ligger i mappen views
app.get('/', (req, res)=>{
    const blogs = [
        {title: 'Title 1', snippet: 'Content blablablab'},
        {title: 'Title 2', snippet: 'Content blablablab'},
        {title: 'Title 3', snippet: 'Content blablablab'}
    ]
    res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res)=>{
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req,res)=>{
    res.render('create', { title: 'Create a new blog' })
})

app.use((req, res)=>{
    res.status(404).render('404', { title: '404' })
})