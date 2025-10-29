const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
    secret: 'apice2025secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Em produção, alterar para true se usar HTTPS
}));

app.use(express.static(path.join(__dirname, 'app/public')));
app.use('/uploads', express.static('/uploads'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

var rotas = require('./app/routes/router');
app.use('/', rotas);

app.listen(port, () => {
    console.log(`Servidor online em: http://localhost:${port}`);
});