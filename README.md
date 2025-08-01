# การใช้งาน express สำหรับการสร้าง server ไว้ใช้งานเบื้องต้น

## คำนำ
express คือ libraly ที่ใช้ในการสร้าง API โดยใช้ร่วมกับ node.js เพื่อให้ใช้งานภาษา javascript ได้โดยไม่ต้องมีหน้าเว็บ

API (Application Interface) คิอ มีหน้้าที่ในการติดต่อระหว่าง Server กับ Client


## วิธีติดตั้งใช้งาน

1. ติดตั้งโปรแกรมจำเป็น
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/downloads)
- [Exampp](https://www.apachefriends.org/download.html)
- [Postman](https://www.postman.com/downloads/) หรือ [Insomnia](https://insomnia.rest/download)
- [Node.js](https://nodejs.org/en/download)

2. ติดตั้งโฟลเดอร์เบื้องต้น
```
git clone https://github.com/hnmpetch/expressjs_68.git
cd expressjs_68
```

3. ติดตั้งไฟล์ที่จำเป็น
```
npm i 
npm install
```
หรือ
```
npm install --global nodemon
npm install express sequelize mysql2
```

> [!CAUTION]
> ควรเข้าไปในโฟลเดอร์ที่จะติดตั้งก่อน จึงจะใช้งาน `npm install`

4. สร้าง ฐานข้อมูล และ table `users` และ `product`

โดยการเปิด exampp และ กด start ที่ apache และ mysql. 

กดที่ admin ตรง mysql และไปที่หัวข้อ database สร้าง database ชื่อ `my_database`

สร้าง table ชื่อ `users`

ตั้งค่าตามตัวอย่าง

![Users Table](/asset/users_table.png)

สร้าง table ชื่อ `product`

ตั้งค่าตามตัวอย่าง

![Users Table](/asset/product_table.png)


4. เปิดเซิฟเวอร์
```
npm run dev
```

> [!WARNING]
> `npm` สามารถใช้ได้แค่ใน `command promt` ไม่สามารถใช้งานได้ใน `power shell`

> [!TIP]
> สามารถทดสอบได้โดยการเปิดไปที่ Insomnia หรือ Postman กด New http request ในช่อง URL ใส่ `http://127.0.0.1:3000/api/users/`

## โครงสร้างไฟล์

โครงสร้างไฟล์อ้างอิงจากรูปแบบ MVC
> จัดโครงสร้างเพื่อให้สวยงามและง่ายต่อการแก้ไข

```
expressjs_68
    - controller
        - productController
        - userController
    - model
        - product.js
        - user.js
    - router
        - productRouter.js
        - userRouter.js
    - database.js
    - server.js
```

## อธิบายการทำงานของไฟล์

### ไฟล์ `server.js`

เรียกใช้งาน module ต่างๆ และกำหนดในตัวแปรคงที่

```
const express = require('express');
const app = express();
const port = 3000;
const { sequelize } = require('./database.js');
const userRouter = require('./router/userRouter.js');
const productRouter = require('./router/productRouter.js');
```

บังคับให้ server สามารถอ่านค่าในรูปแบบ JSON ได้
```
app.use(express.json())
```

กำหนดเส้นทางเพื่อให้ง่ายต่อการแก้ไขไฟล์ ตัวอย่าง URL `http://127.0.0.1:3000/api/users/`
```
app.use('/api/users', userRouter);
app.use('/api/product', productRouter);
```

รอฟังคำขอจาก Client บน port ที่กำหนดไว้
```
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
```

### ไฟล์ `database.js`
เชื่อมต่อและตรวจสอบการเชื่อมต่อของฐานข้อมูล

เรียกใช้งาน module และกำหนดไว้ในตัวแปร

```
const { Sequelize, DataTypes } = require('sequelize');
```

กำหนดตัวแปรชื่อ `sequelize` และเชื่อมต่อกับฐานข้อมูล 

โดยกำหนดค่าตามนี้
```
new Sequelize("<ชื่อฐานข้อมูล>", "ชื่อของผู้ใช้", "รหัสผ่าน", {
    host: "<ไอพีเครื่องหรือโดเมน>",
    dialect: "<ประเภทฐานข้อมูล>"
})
```

Ex.1

```
const sequelize = new Sequelize("my_database", "root", "", {
    host: "localhost",
    dialect: "mysql"
});
```

ตรวจสอบการเชื่อมต่อ
```
sequelize.authenticate()
.then(() => console.log("Connect Database."))
.catch(err => console.log("error while connect to database. error: ", err))
```

ส่งออก Module เพื่อให้ใช้งานได้ในไฟล์อื่นๆ
```
module.exports = {
    sequelize
}
```

### ไฟล์ `user.js` และ `product.js`
ใช้งานในการดึงข้อมูลจาก table

การกำหนดค่าตัวแปร `Product` หรือ `User`
โครงสร้าง
```
const <ชื่อตัวแปร> = sequelize.define("<ชื่อตัวแปร>", {
    <ชื่อคอลัม 1>:{
        type: DataTypes.<ประเภทของข้อมูล>
    },
    <ชื่อคอลัม 2>:{
        type: DataTypes.<ประเภทของข้อมูล>
    },
    ....
},{
    tableName: "<ชื่อของ table >",
    timestamps: false
})
```
Ex.1
```
const User = sequelize.define("User", {
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,   
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "users",
    timestamps: false
});
```

Ex.2
```
const Product = sequelize.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expire_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    create_at: {
        type: DataTypes.TIME,
        allowNull: false
    },
    update_at: {
        type: DataTypes.TIME,
        allowNull: false
    }

}, {
    tableName: "product",
    timestamps: false
})
```

### ไฟล์ `userController` หรือ `productController`
ใช้ในการสร้างฟังชั่นเพื่อทำงานเมื่อมีการเรียกใช้จาก `userRouter.js` หรือ `productRouter.js`


ดึงตัวแปรที่กำหนดไว้จากไฟล์ `product.js`
```
const { Product } = require('../model/product.js');
```


การกำหนดฟังชั่น 
```
async function <ชื่อของฟังชั่น>(req, res){
    return res.send("<ส่งข้อความแบบ Text>")
    return res.json({"ชื่อตัวแปร": "<ส่งข้อมูลแบบ JSON>"})
}
```

Ex.1
```
async function getAllproduct(req, res) {
    const products = await Product.findAll();

    return res.json(products);
}
```

> [!TIP]
> `.json` คือการส่งออกข้อมูลและจัดให้อยู่ในรูปแบบ JSON
> `.send` คือการส่งข้อมูลแบบ Text
> `.status` คิอการกำหนด status code โดยมีค่าเริ่มต้นเป็น 200


> [!TIP]
> async คือฟังชั่นแบบทำตามขั้นตอน ใช้ร่วมกับ await เพื่อบอกส่วนอื่นๆในฟังชั่นว่าให้ฟังชั่นนี้เสร็จก่อนค่อยทำอันอื่น

ส่งออกฟังชั่น
```
module.exports = {
    <ชื่อฟังชั่น1>,
    <ชื่อฟังชั่น2>,
    <ชื่อฟังชั่น3>,
    <ชื่อฟังชั่น...>,
}
```

### ไฟล์ `productRouter.js`
ใช้เพื่อกำหนดว่า endpoint ใหนควรใช้ฟังชั่นใหน

โครงสร้าง 
```
router.<ประเภทของ CURD>('<path>', product.<ชื่อฟังชั่นที่กำหนดไว้ใน `productContoller`>)
```

Ex.1
```
router.get('/', products.getAllproduct);
```

Ex.2
```
router.post('/register', products.registerProduct);
```

Ex.3
```
router.delete('/:code', products.deleteProduct);
```

> [!TIP]
> CURD คือประเภทของ API มี GET, POST, DELETE, PUT, CREATE, อื่นๆ

## คำสั่งที่ใช้งานเป็นประจำ

การกำหนดค่าตัวแปร
```
const <ชื่อตัวแปร> // แบบคงที่
let <ชื่อตัวแปร> // แบบแก้ไขได้
```

### การขอข้อมูลจาก Request
การดึงข้อมูลจาก Body
```
req.body;
```


การกำหนดชื่อ parameter
```
app.get('/:<ชื่อ parameter>', ...)
```

การดึงข้อมูลจาก Parameter

Ex `/product/1` '1' คือ parameter


```
req.params.<ชื่อของ parameter>;
```

การกำหนดชื่อ Querey parameter
```
app.get('/product:<ชื่อ parameter>', ...)
```
Ex `/product?id=1`


การดึงข้อมูลจาก Query parameter
```
const { <ชื่อของ Query> } = req.query;
```

### การดึงข้อมูลจาก table

การดึงข้อมูลทั้งหมด
```
<ชื่อของ table>.findAll()
```

การดึงข้อมูลแบบเลือก
```
<ชื่อของ table>.findAll({
    where: {
        <ชื่อของคอลัม>: <สิ่งที่ต้องการหา>
    }
})
```

การดึงข้อมูลแบบเลือก
```
<ชื่อของ table>.findAll({
    where: {
        <ชื่อของคอลัม>: <สิ่งที่ต้องการหา>
    },
    order: [[
        <ชื่อของคอลัม>: <รูปแบบการเรียงข้อมูล>
    ]],
    attributes: [
        <ชื่อของคอลัมที่ต้องการ 1>,
        <ชื่อของคอลัมที่ต้องการ 2>,
        <ชื่อของคอลัมที่ต้องการ ...>,
    ]
})
```

Ex.1
```
const product = await Product.findAll({
    where: { id: 1 },
    order: [['date', 'DESC']],
    attributes: ['id', 'date', 'title', 'content'],
});
```

### การใช้งาน git

การส่งข้อมูลขึ้น git
```
git add .
git commit -m "<ข้อความ>"
git push origin <main หรือ master>
```

เลือกทั้งหมด
```
git add .
```

เลือกเฉพาะ
```
git add <ชื่อไฟล์>
```

การอัดไฟล์และใส่รายละเอียด
```
git commit -m "<ข้อความ>"
```

การส่งข้อมูลขึ้น Github
```
git push origin <main หรือ master>
```

