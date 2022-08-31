const express = require('express') // express 모듈을 가져옴
const app = express() // 새로운 express 앱을 만듦
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application.x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://moongil:!s87954685@boilerplate.s6e1qpy.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!~ 안녕하세요! ')
})

app.post('/register', (req, res) =>{

  // 회원 가입할때 필요한 정보를 client 에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})