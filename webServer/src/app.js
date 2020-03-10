const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jade'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Jade'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'Jade'
    })
})

/* exemples
 app.get('/help', (req, res) => {
     res.send([{
         name: 'Jade',
         age: 29
     }, {
         name: 'Andrew',
         age: 27
     }])
 })

 app.get('/about', (req, res) => {
     res.send('<h1>About</h1>')
 })*/

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is cold',
        location: 'Shawinigan'
    })
})

app.listen(3000, () => {
    console.log('server up on port 3000')
})