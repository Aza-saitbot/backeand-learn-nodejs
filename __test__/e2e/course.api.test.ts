import request from 'supertest'
import {app, HTTP_STATUSES} from "../../src";

describe('/course',()=>{

    beforeAll(async ()=>{
        await request(app).delete('/__test__/data')
    })

    it('Orders return 200, empty array',async ()=>{
        await request(app)
            .get('/orders')
            .expect(HTTP_STATUSES.OK_200,[])
    })

    it('Should not create order incorrect input data',async ()=>{
        await request(app)
            .post('/orders')
            .send({name:''})
            .expect(HTTP_STATUSES.BAD_REQUEST_400,)
    })
})