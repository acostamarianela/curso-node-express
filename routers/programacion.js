const express = require('express'); 

const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

//middleware, las funciones de la misma se ejecutan despues de recibir una solicitud y antes de enviar una respuesta
//middleware tiene acceso al objeto de la solicitud, al objeto de la respuesta y a next(), una funcion que se llama para ejecutar al proximo middleware
routerProgramacion.use(express.json())

routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(programacion));
})



// los dos puntos : me indica que es un parametro url , los cuales podemos extraer del proceso de req
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje; //lenguaje es el nombre que le asignamos al parametro
    const resultados = programacion.filter( curso => curso.lenguaje === lenguaje);

    if (resultados.lenght === 0 ){
        return res.status(404).send(`no se encontraron cursos de ${lenguaje}`)
    }

    if (req.query.ordenar === 'vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b) => a.vistas - b.vistas)));
    }
    res.send(JSON.stringify(resultados));
})

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje; //lenguaje es el nombre que le asignamos al parametro
    const nivel = req.params.nivel;
    const resultados = programacion.filter( curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if (resultados.length === 0 ){
        return res.status(404).send(`no se encontraron cursos de ${lenguaje} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultados));
})

routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    console.log(cursoNuevo)
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));

})

routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0){
        programacion[indice] = cursoActualizado; 
    }
    res.send(JSON.stringify(programacion));
});

//con patch solo pasamos los parametros que queremos cambiar
routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0){
        const cursoAModificar = programacion[indice]; 
        Object.assign(cursoAModificar, infoActualizada); //se asigna la info actualizada al objeto a actualizar
    }
    res.send(JSON.stringify(programacion));
})


routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0){
        programacion.splice(indice, 1);
        
    }
    res.send(JSON.stringify(programacion));
})

module.exports = routerProgramacion;