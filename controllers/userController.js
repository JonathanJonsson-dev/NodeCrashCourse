const userGet = (req, res) => {
    res.render('cool').catch((err)=>{
        res.status(404).render('404', {title: 'Blog not found'})
    })
}

module.exports = {userGet}