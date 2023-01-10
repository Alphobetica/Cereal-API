// const express = require('express')
// const app = express()
// const PORT = 3000

// const cereals = {
//     'all bran':{
//         'name': 'All-Bran',
//         'brand': "Kellog's",
//         'lifetime': "1916-present",
//         'fiber': '64%',
//         'sugar': '24%'
//     },
//     'alpha bits':{
//         'name': 'Alpha-Bits',
//         'brand': "Post Cereals",
//         'lifetime': "1957-2021",
//         'fiber': '8%',
//         'sugar': '24%'
//     },
//     "captain crunch":{
//         'name': "Cap'n Crunch",
//         'brand': "Quaker Oats",
//         'lifetime': "1963-present",
//         'fiber': '2%',
//         'sugar': '34%'
//     },
//     'cheerios':{
//         'name': 'Cheerios',
//         'brand': "General Mills",
//         'lifetime': "1941-present",
//         'fiber': '10%',
//         'sugar': '3%'
//     },
//     'chex':{
//         'name': 'Chex',
//         'brand': "General Mills",
//         'lifetime': "1936-present",
//         'fiber': '9%',
//         'sugar': '7%'
//     },
//     'cinnamon toast crunch':{
//         'name': 'Cinnamon Toast Crunch',
//         'brand': "General Mills",
//         'lifetime': "1984-present",
//         'fiber': '7%',
//         'sugar': '24%'
//     },
//     'corn flakes':{
//         'name': 'Corn Flakes',
//         'brand': "Kellog's",
//         'lifetime': "1894-present",
//         'fiber': '3%',
//         'sugar': '5%'
//     },
//     'not on the list':{
//         'Error': 'Item not found',
//         'note': 'Perhaps consider eating something healthier than cereal'
//     }
// }
// //Serve an html
// app.get('/', (req,res)=>{
//   res.sendFile(__dirname + '/index.html')  
// })

// //Search function
// app.get('/api/:name', (req, res)=>{
//     const search = req.params.name.toLowerCase()
//     if(cereals[search]){
//         res.json(cereals[search])
//     }else{
//         res.json(cereals['not on the list'])
//     }
//     console.log(search)
// })

// //Listen on a port
// app.listen(process.env.PORT || PORT, ()=> {
//     console.log(`Server is Live on port: ${PORT}`)
// })

//adding and requiring express
const express = require('express')
//defining express function so methods can be used on it
const app = express()
//json parser so backend can handle and read json
const bodyParser = require('body-parser')
//requiring mongodb for the server to access it and use it's methods
const MongoClient = require('mongodb').MongoClient
//defining port so i can change it or let it vary by the host service
const PORT = 3000

//allowing access for the public folder on the front end
app.use(express.static('public'))
//app.use(express.urlencoded)
app.use(express.json())
//Not Sure
app.use(bodyParser.urlencoded({extended: true}))
//telling out server to use the body parser on json files
app.use(bodyParser.json())


//connecting to the mongodatabase that I've set up, Should find a way to hide the password so i dont submit it
MongoClient.connect('mongodb+srv://FirstDjinn:findelamonde1@cluster0.3mtsvq9.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})
//once the server is connected to the mongodb make the server live and able to do everything that follows
    .then(client=> {
        //just to check if the database is connected
        console.log('Connected to Database')
        //defining the database in my cluster to access and naming it for further use
        const db = client.db('Cereal-Api')
        //defining the collection to access in my database and naming it for further use
        const cerealCollection = db.collection('cereals')

        //Not sure how this works but it allows the server to process the ejs into html
        app.set('view engine', 'ejs')
        
        //C(Read)UD request from the frontend to the server, and what to do with given read requests
        app.get('/', (req, res)=>{
            //making of the database info into an array for so it is easily processed
            cerealCollection.find().toArray()
                //then 
                .then(results =>{
                    // render the key cereals and its value results into ejs so it can create a reactive page
                    res.render('index.ejs', {cereals: results})
                })
                //error handling to report an issue in the Reading/getting request
                .catch(error => console.error(error))
        })

        //(Create)rud requests from the frontend main.js and how to handle them server and database sided
        app.post('/cereals', (req, res)=>{
            //using method on mongodb to insert a new object from the frontend onto the mongodatabase
            cerealCollection.insertOne(req.body)
                .then(result=>{
                    //console logging result so i can confirm or document the server actions
                    console.log(result)
                    //redirecting to the main page so the page refreshes
                    res.redirect('/')
                })
                //error handling for post/create requests
                .catch(error => console.error(error))
        })

        //CR(Update)D requests from the frontend and server sided handling but currently there is no update
        // app.put('/cereals', (req, res)=>{
        //     cerealCollection.findOneAndUpdate(
        //         {name: },
        //         {$set: {
        //             name: req.body.name,
        //             quote: req.body.quote
        //             }
        //         },
        //         {
        //             upsert: true
        //         }
        //     )
        //     .then(result => {
        //         console.log(req.body)
        //         res.json('Success')
        //     })
        //     .catch(error => console.error(error))
        // })

        //CRU(Delete) requests from the frontend and server sided handling
        app.delete('/cereals', (req, res)=>{
            //mongodb deletes one mongo entry that 
            cerealCollection.deleteOne(
                {name : req.body.name}
            )
                .then(result => {
                    //if the database returns that nothing was deleted, state such, otherwise specify the thing deleted
                    if(result.deletedCount === 0){
                      return res.json('Nothing Deleted')  
                    }else{
                        res.json(`Deleted ${req.body.name}`)
                    }
                })
                .catch(error => console.error(error))

        })

        //hosting the server on a local (or designated) port so it can listen to frontend requests
        app.listen(process.env.PORT || PORT,() =>{
            //Consol logging that the server is live and on what port
            console.log(`Server Live on port ${PORT}`)
        })
    
    })
    //error handling of mongodb connection
    .catch(error => console.error(error))  








