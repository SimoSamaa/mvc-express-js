const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRouter = require('./routers/admin');
const shopRouter = require('./routers/shop');
const errors = require('./controllers/errors');

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(errors.page404Error);

app.listen(2000, () => {
  console.log('server run!!');
});
