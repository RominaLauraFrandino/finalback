require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors());
app.use(express.json())
const User = require('./models/user')

app.get('/', (request, response) => {
    response.send('hola mundo');
})

app.post('/login', (request, response) => {
    User.findOne({
        nombre: request.body.username,
        contrasena: request.body.password
    })
        .then(resp => {
            if (resp) {
                response.send('ok');
            } else {
                response.status(401).json({ 'error': 'Usuario o contraseña incorrectos' })
            }

        })
        .catch(err => {
            response.send(err);
        })
})

app.post('/users', (request, response) => {
    const user = new User({
        nombre: request.body.name,
        apellido: request.body.lastName,
        dni: request.body.dni,
        anio: request.body.grade,
        carrera: request.body.career
    }
    )
    user.save()
        .then(resp => {
            if (resp) {
                console.log('usuario creado con éxito')
                response.send('OK')
            } else {
                response.status(404).json({ 'error': 'ocurrió un error' })
            }
        })
        .catch(err => {
            console.log(err);
            response.json(err);
        })
})

app.put('/users/:dni', (request, response) => {

    User.findOneAndUpdate({dni: request.params.dni}, {
        nombre: request.body.name,
        apellido: request.body.lastName,
        dni: request.body.dni,
        anio: request.body.grade,
        carrera: request.body.career
    })
        .then(resp => {
            if (resp) {
                console.log('usuario creado con éxito')
                response.send('OK')
            } else {
                response.status(404).json({ 'error': 'ocurrió un error' })
            }
        })
        .catch(err => {
            console.log(err);
            response.json(err);
        })
})

app.delete('/users', (request, response) => {
    User.deleteOne({
        dni: request.body.dni
    }).then(resp => {
        response.send(resp);
    })
    .catch(err => {
        response.send(err);
    })
})

app.get('/users', (request, response) => {
    User.find({})
        .then(resp => {
            response.send(resp);
        })
        .catch(err => {
            response.send(err);
        })
})

app.get('/users/:carrer', (request, response) => {
    const {carrer }= request.params;
    User.find({
        carrera: carrer
    }).then(resp => {
        response.send(resp);
    })
    .catch(err => {
        response.send(err);
    })
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`app corriendo en puerto ${PORT}`);
})