const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const moment = require('moment');
const cors = require('cors');
const app = express();
const port = 8000;
const dbConfig = {
    host: '127.0.0.1', // โฮสต์ของ MySQL database server
    user: 'root', // ชื่อผู้ใช้ของฐานข้อมูล MySQL
    password: '', // รหัสผ่านของผู้ใช้ MySQL
    database: 'test' // ชื่อของฐานข้อมูล MySQL ที่ต้องการเชื่อมต่อ
};

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get('/accounts', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT * FROM account");
        conn.end();
        res.json(data);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
});

app.get('/chats', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT * FROM chat");
        conn.end();
        res.json(data);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
});

app.get('/products', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT * FROM product");
        conn.end();
        res.json(data);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
});
app.get('/products/:category', async (req, res) => {
    const category = req.params.category;

    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query('SELECT * FROM product WHERE Category = ?', [category]);
        conn.end();
        res.json(data);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.get('/product_name/:Product_name', async (req, res) => {
    const Product_name = req.params.Product_name;

    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query('SELECT * FROM product WHERE Product_name LIKE ?', [`%${Product_name}%`]);
        conn.end();
        res.json(data);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.get('/statments', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT * FROM statment");
        conn.end();
        res.json(data);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
});
app.post('/statments' , async(req, res) => {
    try {
        const conn =  await mysql.createConnection(dbConfig);
        const [data] = await conn.query(
            "INSERT INTO statment (Order_ID, Order_Date, User_id, Product_ID, Amount, Payment) VALUES (?, ?, ?, ?, ?, ?);",
             [
              req.body.Order_ID,
              req.body.Order_Date,
              req.body.User_id,
              req.body.Product_ID,
              req.body.Amount,
              req.body.Payment,
            ])
        conn.end(); 
        res.json(data);
    } catch (error) {
        res.status(500).json({"message: " :error.message});
    }
});

app.get('/stores', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT * FROM store");
        conn.end();
        res.json(data);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
});
