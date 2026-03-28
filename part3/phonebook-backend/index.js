require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.content(req, res)
    ].join(' ')
}))

app.get('/', (request, response) => {
    response.send('<h1>Hello Phonebook!</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons =>
        res.json(persons)
    )
})


app.get('/api/info', (req, res, next) => {
    Person.find({})
        .then(persons => {
            const requestTime = new Date()
            res.send(
                `<p>Phonebook has info for ${persons.length} people</p>
                <p>${requestTime}</p>`
            )
        }
        ).catch(error => next(error))

})


app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(
        person => res.json(person)
    )
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => { res.status(204).end() }
        )
        .catch(error => {
            next(error)
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json(
            { error: 'name or number missing' }
        )
    }

    const newPerson = new Person({
        id: crypto.randomUUID(),
        name: body.name,
        number: body.number
    })


    newPerson.save().then(
        savedPeson => res.json(savedPeson)
    )
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body
    Person.findById(req.params.id).then(
        person => {
            if (!person) {
                return res.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then(
                updatedPerson => { res.json(updatedPerson) }
            )
        }
    ).catch(
        error => next(error)
    )
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`run the fuck server on ${PORT}`);

})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)