const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
app.use(express.json());

const customers = []



app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some((customers) => customers.cpf === cpf);

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "error customer already exists" })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
    return response.status(201).send()
})

app.listen(3333)