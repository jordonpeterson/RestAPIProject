const Joi = require('joi');
const express = require('express');



const app = express();
//Creates an express application called App
app.use(express.json())
//parses incoming requests with JSON payloads.

values = [
    {id:1, name:"a"},
    {id:2, name:"b"},
    {id:3, name:"c"}
]

app.get('/',(req,res) =>{
    res.send('hello world')
})
app.get('/users', (req,res) =>{
    res.send(values)
})
app.get('/users/:id', (req,res) =>{
    const value = values.find(c => {c.id ===parseInt(req.params.id)});
    if(!value) res.status(404).send('We can\t find that id. Sorry!');
    res.send(value);
})

app.post('/users', (req, res) => {
   joiValidate(req.body)
   // console.log(result)
    if(result.error){
        res.status(400).send(result.error.result)
        return;
    }
    const value = {
    id: values.length +1,
    name: req.body.name
    }
    values.push(value);
    res.send(value);
})
const joiValidate = (input) =>{
    const schema = {
        name: Joi.string().max(40).required()
    };
    return Joi.validate(input, schema)
}

app.put('/users/:id',(req, res) => {
    const value = values.find(c => c.id ===parseInt(req.params.id));
    if(!value) res.status(404).send('We can\t find that id. Sorry!');

    joiValidate(req.body);

    value.name = req.body.name;
    res.send(value)

})
app.delete('/users/:id', (req, res) => {
    const value = values.find(c => c.id ===parseInt(req.params.id));
    if(!value) res.status(404).send('We don\'t have a value with that id');
    const index= values.indexOf(value);
    values.splice(index,1);
    res.send(value);
})


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`${port}`));