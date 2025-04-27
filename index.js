import express from 'express';
import fs from 'fs';

const app = express();
const readData=()=>{
    const data=fs.readFileSync("./db.json");
    console.log(JSON.parse(data));
    return JSON.parse(data);
}

const writeData=(data)=>{
    fs.writeFileSync("./db.json", JSON.stringify(data));
}

app.get('/libros', (req, res) => {
    const data = readData();
    res.json(data.libros);
});

app.get('/libros/:id', (req, res) => {
    const data = readData();
    const id=parseInt(req.params.id);
    const libro=data.libros.find(libro=>libro.id===id);
    if(!libro){
        return res.status(404).json({error:"Libro no encontrado"});
    }
    res.json(libro);
});

app.get('/', (req, res) => {
    res.send('Hello World!...');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});