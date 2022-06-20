// install and import express
const express = require("express");
const fs = require("fs");
// const express = () => {};
let app = express();
app.use(express.json());
// Code here

// Note: Do not remove this export statement
const data = require("./assets/user.json")
app.get('/', function(req, res) {
    res.sendFile('./assets/users.html', {root: __dirname })
});
app.get("/users", async (req, res) => {
    try {
      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.get("/users/:id", async (req, res) => {
    try {
        const user = data.filter((e)=>e.id==req.params.id)
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
app.post("/users",async(req,res)=>{
    try{
    let id = data[data.length - 1].id; req.body.id = id + 1; 
       data.push(req.body);
       const jsonString = JSON.stringify(data)
       fs.writeFile('./src/assets/user.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            return res.status(200).send(data[data.length-1]); 
        }
    }) 
    }
    catch(err){
        return res.status(500).send({ message: err.message });

    }
})


app.listen(8000, async function () {
    console.log("listening on port 8000");
  });
module.exports = app;