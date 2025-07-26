const express = require('express')
const app = express()
const port = 3000
const { sequelize, User } = require('./database.js');

app.get('/', (req, res) => {

  // req ย่อมาจาก request หรือ คำขอที่ฝั่ง client ส่งมาหรือ คอมพิวเตอร์ โทรศัพท์
  // res ย่มาจาก response หรือ การตอบกลับไปยังฝั่ง client

  // '/' <<== คือการกำหนด path ของมัน 
  // ตัวอย่าง 'https://<ip>:<port>/' 
  // แยกที่ละส่วน 'http' กับ 'https' ต่างกัน 
  // โดย 'http' ไม่มีการเข้ารหัสและสามารถขโมยข้อมูลได้
  // โดย 'https' จะมีการเข้ารหัสของข้อมูลจึงไม่สามารถขโมยหรือดูเนื้อหาไฟล์ได้
  // โดย 's' ที่เติมมาหลัง http คือการแสดงว่าเว็บไซต์นี้ได้ทำการเข้ารหัสข้อมูลแล้วโดยได้มาจาก CA Certifie
  // ip คือ ip ของเซิฟเวอร์ หรือ โดเมน
  // ':<port>' คือการกำหนด port พิเศษให้กับ ip ถ้าไม่กำหนด จะดูจากด้านหน้า ถ้าเป็น 'http' จะเป็น port 80 และ 'https' จะเป็น port 445
  // path ของเว็บไซต์ เริ่มต้นคือ '/'
  // ตัวอย่าง 'http://127.0.0.1:3000/'

  // ส่งข้อความกลับไปยังต้นทาง
  // '.send(<ข้อความ>)' คือการส่งข้อความ
  res.send('Hello World!2')
})


// คือการขอข้อมูล users 
// ตัวอย่าง คำขอที่ขอมา 'http://127.0.0.1:3000/users'
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
})

// เปิดเซิฟเวอร์และ รอรับคำขอจากฝั่ง client ที่ port ที่กำหนดไว้
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
