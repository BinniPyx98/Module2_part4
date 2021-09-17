const request = require('supertest')
const app = require('../../server')
const {response} = require("express");

it('gallery for uploadImage 200', async () => {
    const res = await request(app).post('/uploadImage')
        .send({"email": "asergeev@flo.team", "password": "jgF5tn4F"})
    expect(res.statusCode).toEqual(200)
    const test=await JSON.parse(res.text)
    let test2=JSON.stringify(test)
    console.log(test2)
    expect(1).toBe(1)
})

it('gallery 200', async () => {
    const res = await request(app).post('/uploadImage')
        .send({email: "asereev@flo.team", password: "jgF5tn4F"})
    
    expect(res.statusCode).toEqual(200)
})
