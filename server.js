  


const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/cp'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/cp/'}),
);

app.listen(process.env.PORT || 8085);