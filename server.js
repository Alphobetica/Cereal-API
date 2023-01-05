const express = require('express')
const app = express()
const PORT = 3000

const cereals = {
    'all bran':{
        'official name': 'All-Bran',
        'brand': "Kellog's",
        'lifetime': "1916-present",
        'fiber': '64%',
        'sugar': '24%'
    },
    'alpha bits':{
        'official name': 'Alpha-Bits',
        'brand': "Post Cereals",
        'lifetime': "1957-2021",
        'fiber': '8%',
        'sugar': '24%'
    },
    "captain crunch":{
        'official name': "Cap'n Crunch",
        'brand': "Quaker Oats",
        'lifetime': "1963-present",
        'fiber': '2%',
        'sugar': '34%'
    },
    'cheerios':{
        'official name': 'Cheerios',
        'brand': "General Mills",
        'lifetime': "1941-present",
        'fiber': '10%',
        'sugar': '3%'
    },
    'chex':{
        'official name': 'Chex',
        'brand': "General Mills",
        'lifetime': "1936-present",
        'fiber': '9%',
        'sugar': '7%'
    },
    'cinnamon toast crunch':{
        'official name': 'Cinnamon Toast Crunch',
        'brand': "General Mills",
        'lifetime': "1984-present",
        'fiber': '7%',
        'sugar': '24%'
    },
    'corn flakes':{
        'official name': 'Corn Flakes',
        'brand': "Kellog's",
        'lifetime': "1894-present",
        'fiber': '3%',
        'sugar': '5%'
    },
    'not on the list':{
        'Error': 'Item not found',
        'note': 'Perhaps consider eating something healthier than cereal'
    }
}

//Serve an html
app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/index.html')  
})

//Search function
app.get('/api/:name', (req, res)=>{
    const search = req.params.name.toLowerCase()
    if(cereals[search]){
        res.json(cereals[search])
    }else{
        res.json(cereals['not on the list'])
    }
    console.log(search)
})

//Listen on a port
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Server is Live on port: ${PORT}`)
})