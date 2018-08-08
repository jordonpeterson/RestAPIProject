const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json())

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
    const course = values.find(c => c.id ===parseInt(req.params.id));
    if(!course) res.status(404).send('We can\t find that id. Sorry!');
    res.send(course);
})

app.post('/users', (req, res) => {
    const schema = {
        name: Joi.string().max(40).required()
    };
    const result = Joi.validate(req.body, schema)
    console.log(result)
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


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`${port}`));