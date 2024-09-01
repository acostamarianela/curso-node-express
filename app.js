const express = require('express'); 

const app = express(); 

const {infoCursos} = require('./datos/cursos.js')


//routers 

// use que le dice a express que le dice que use un camino para un router
const routerProgramacion = require('./routers/programacion.js')
app.use('/api/cursos/programacion', routerProgramacion); //podemos aplicar lo mismo con matematicas
const routerMatematicas = require('./routers/matematicas.js')
app.use('/api/cursos/matematicas', routerMatematicas); 

//routing
//todo se hace a traves de la app para definir los metodos que maneja la ruta, y cual es el camino del metodo
app.get('/', (req, res) => {
    res.send('Mi primer servidor')
})


app.get('/api/cursos', (req, res) => {
    res.send(infoCursos);
})




const PUERTO = 3000; 
app.listen(PUERTO, () => {
    console.log('escuchando el puerto...........')
})