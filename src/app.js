const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app =express();

// define paths for express config.
const pathDirectory=path.join(__dirname, '../public');
const viewsPath=path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location.
app.set('views',viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// setup static directory to serve.
app.use(express.static(pathDirectory));

app.get('',(req, res)=>{

    res.render('index', {

        title:' Weather ',
        name:'Vikesh Kumar'
    });
})
 app.get('/about', (req,res)=>{
     res.render('about', {
         title:'About ',
         name:'Vikesh Kumar'
     });
 })
 app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help ',
        name:'Vikesh Kumar',
        helpText:'Help Please!'
    });
})


app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        return res.send({

            error: 'You must provide a Address term',
        })
    }

     geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
         
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
     })
    // console.log(req.query);
    // res.send({
        
    //     forecast:"it is ranning",
    //     location:'Bhagalpur',
    //     address: req.query.address,
        
    // });
})

app.get('/products', (req, res)=>{
    
    if(!req.query.search){
        return res.send({

            error: 'You must provide a search term',
        })
    }
    console.log(req.query);
    res.send({
        products:[],
    })
})

app.get('/help/*',(req, res)=>{

    res.render('404', {

        name:'Vikesh Kumar',
        title:'404',
        errorMessage:'Help page Not found!',
    });
})

app.get('*',(req, res)=>{

    res.render('404', {
        name:'Vikesh Kumar',
        title:'404',
        errorMessage:'Error 404 not found!',
    });
})

app.listen(3000, ()=>{

    console.log('Server is up on port 3000.');
})