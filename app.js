const express = require('express');
const mongoose = require('mongoose');
// const Handlebars = require('handlebars');
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// const exphbs = require('express-handlebars');
const port = 9999;
const app = express();

app.use(express.static('static'));

//db connection
const url = "mongodb+srv://ishan10086:ishan@cluster0.t6oh9fd.mongodb.net/mongocrudtask";
mongoose
    .connect(url)
    .then(res => console.log("Database Connected"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// app.engine('handlebars', exphbs.engine({
//     handlebars: allowInsecurePrototypeAccess(Handlebars)
// }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// app.set('views', './views');

const mainPage = require('./routers/mainRouter');
const userPage = require('./routers/userRouter');
const productPage = require('./routers/productRouter');

app.use('/', mainPage);
app.use('/user', userPage);
app.use('/product', productPage);

app.listen(port, () => console.log(`Server is start on ${port}`));
