const express = require('express'); 

const {matematicas} = require('../datos/cursos.js').infoCursos;
const routerMatematicas = express.Router();

routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas));
})

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema; //tema es el nombre que le asignamos al parametro
    const resultados = matematicas.filter( curso => curso.tema === tema);

    if (resultados.length === 0 ){
        return res.status(404).send(`no se encontraron cursos de ${tema}`)
    }
    res.send(JSON.stringify(resultados));
})

module.exports = routerMatematicas;








