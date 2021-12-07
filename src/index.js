const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')
app.use(express.json())


const customers = []


function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;
    console.log(cpf);
    const customer = customers.find((customers) => customers.cpf === cpf)

    if (!customer) {
        return response.status(400).json({ error: 'Customer not found' })
    }

    request.customer = customer;
    return next()
}


app.post('/account', (request, response) => {
    const { cpf, name } = request.body
    console.log(name);
    const customerAlreadyExists = customers.some((customers) => customers.cpf === cpf)

    if (customerAlreadyExists) {
        return response.status(400).json({ error: 'Customer already exists!' })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send()
})
app.get('/statement/', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    return response.json(customer.statement)
})
app.listen(3333, () => {
    console.log('ok');
})