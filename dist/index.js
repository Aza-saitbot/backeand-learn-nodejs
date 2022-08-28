"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
const db = {
    orders: [
        { id: 1, name: 'sait-Azamat' },
        { id: 2, name: 'Vadim' },
        { id: 3, name: 'sait-Radik' },
        { id: 4, name: 'sait-Alina' },
    ]
};
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NOT_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
app.get('/', (req, res) => {
    let a = 4;
    if (a > 5) {
        res.send('OK!');
    }
    else {
        res.send('Hello World!2222222222');
    }
});
app.get('/orders', (req, res) => {
    let findOrders = db.orders;
    if (req.query.name) {
        findOrders = findOrders.filter(i => i.name.indexOf(req.query.name) > -1);
    }
    res.json(findOrders);
});
app.post('/orders', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createdOrder = {
        id: +(new Date()),
        name: req.body.name
    };
    db.orders.push(createdOrder);
    res.status(201).json(createdOrder);
});
app.delete('/orders/:id', (req, res) => {
    if (!req.params.id) {
        res.sendStatus(HTTP_STATUSES.NOT_CONTENT_204);
        return;
    }
    db.orders = db.orders.filter(i => i.id !== +req.params.id);
    res.status(HTTP_STATUSES.NOT_CONTENT_204);
});
app.put('/orders/:id', (req, res) => {
    if (!req.params.id) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const findOrder = db.orders.find(i => i.id === +req.params.id);
    if (!findOrder) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    findOrder.name = req.body.name;
    console.log('db', db.orders);
    res.sendStatus(HTTP_STATUSES.NOT_CONTENT_204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
