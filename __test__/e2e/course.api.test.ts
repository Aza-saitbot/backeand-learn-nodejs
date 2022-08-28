import request from 'supertest'
import {app, HTTP_STATUSES} from "../../src";
import {CreateOrderModel} from "../../src/models/CreateOrderModel";

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
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get('/orders')
            .expect(HTTP_STATUSES.OK_200,[])
    })

    let createdOrder:any=null

    it('should create order with input data', async ()=> {

        const data:CreateOrderModel={
            name:'testing new order Name'
        }

        const createResponse=await request(app)
            .post('/orders')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)

        createdOrder=createResponse.body

        expect(createdOrder).toEqual({
            id:expect.any(Number),
            name:data.name
        })

        await request(app)
            .get('/orders')
            .expect(HTTP_STATUSES.OK_200,[createdOrder])
    });

    let createdOrder2:any=null
    it('should create one more order', async ()=> {

        const createResponse=await request(app)
            .post('/orders')
            .send({name:'test2 Aza'})
            .expect(HTTP_STATUSES.CREATED_201)

        createdOrder2=createResponse.body

        expect(createdOrder2)
            .toEqual({
                id:expect.any(Number),
                name:'test2 Aza'
            })

        await request(app)
            .get('/orders')
            .expect(HTTP_STATUSES.OK_200,[createdOrder,createdOrder2])



    });
})