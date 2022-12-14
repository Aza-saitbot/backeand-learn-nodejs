import express, {Request,Response} from 'express'
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "./types";
import {QueryOrderModel} from "./models/QueryOrderModel";
import {OrderViewModel} from "./models/OrderViewModel";
import {CreateOrderModel} from "./models/CreateOrderModel";
import {URIParamsOrderIdModel} from "./models/URIParamsOrderIdModel";
import {UpdateOrderModel} from "./models/UpdateOrderModel";


export const app = express()
const port = 5000
app.use(express.json())


type Order={
    id:number,name:string
}

const db:{orders:Order[]}={
    orders:[
        {id:1,name:'sait-Azamat'},
        {id:2,name:'Vadim'},
        {id:3,name:'sait-Radik'},
        {id:4,name:'sait-Alina'},
    ]
}

export const HTTP_STATUSES={
    OK_200:200,
    CREATED_201:201,
    NOT_CONTENT_204:204,
    BAD_REQUEST_400:400,

    NOT_FOUND_404:404
}

app.get('/', (req, res) => {
    let a = 4
    if (a > 5) {
        res.send('OK!')
    } else {
        res.send('Hello World!2222222222')
    }
})


app.get('/orders', (req:RequestWithQuery<QueryOrderModel>, res:Response<OrderViewModel[]>) => {

    let findOrders=db.orders
    if (req.query.name){
        findOrders=findOrders.filter(i=>
            i.name.indexOf(req.query.name as string)>-1
        )
    }
    res.json(findOrders.map(dbOrder=>({
        id:dbOrder.id,
        name:dbOrder.name
    })))

})

app.post('/orders', (req:RequestWithBody<CreateOrderModel>, res:Response<OrderViewModel>) => {

    if (!req.body.name){
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return;
    }

    const createdOrder:Order={
        id:+(new Date()),
        name:req.body.name
    }
   db.orders.push(createdOrder)
    res.status(201).json(createdOrder)

})

app.delete('/orders/:id', (req:RequestWithParams<URIParamsOrderIdModel>, res) => {

    if (!req.params.id){
        res.sendStatus(HTTP_STATUSES.NOT_CONTENT_204)
        return
    }
    db.orders=db.orders.filter(i=>i.id !== +req.params.id)
    res.status(HTTP_STATUSES.NOT_CONTENT_204)
})

app.put('/orders/:id', (req:RequestWithParamsAndBody<URIParamsOrderIdModel,UpdateOrderModel>, res) => {

    if (!req.params.id){
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return;
    }

    const findOrder = db.orders.find(i=>
        i.id === +req.params.id
    )
    if (!findOrder){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    findOrder.name = req.body.name
    res.sendStatus(HTTP_STATUSES.NOT_CONTENT_204)



})

app.delete('/__test__/data', (req, res) => {
    db.orders=[]
    res.sendStatus(HTTP_STATUSES.NOT_CONTENT_204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})