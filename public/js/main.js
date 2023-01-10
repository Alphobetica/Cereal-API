//defining the delete button
const deleteButton = document.querySelectorAll('.deleteButtons')
// defining the text output
const messageSpan = document.querySelector('#message')

//event listenering the delete button
deleteButton.addEventListener('click', _=>{
    //making the backend request to delete a database entry
    fetch('/cereals', {
        //specifying the request is delete
        method: 'delete',
        //specifying the content of the request is being sent in JSON I THINK
        headers: {'Content-Type':'application/json'},
        //making the request into json
        body: JSON.stringify({
            //i dont know how to target the id of the specific cereal's delete button
            id: req.body._id
        })
    })
    //if it goes through, return the response in json
    .then(res =>{
        if(res.ok){
            return res.json()
        }
    })
    //if the response is literally this string, add text to the message section otherwise reload page to show the deleted content is gone
    .then(response =>{
        if(response === 'Nothing Deleted'){
            messageSpan.textContent = 'No Cereals Were Deleted'
        }else{
            window.location.reload(true)
        }
    })
    .catch(error=> console.error(error))
})