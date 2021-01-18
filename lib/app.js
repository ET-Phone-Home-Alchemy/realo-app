const express = require('express');
const app = express();

app.use(express.json());

<<<<<<< HEAD

app.use('/api/v1/auth', require('./controllers/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));



=======
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

>>>>>>> e4ffc10e856e28dc6dfa0c63a4cfd0c594dbe5f8
module.exports = app;
