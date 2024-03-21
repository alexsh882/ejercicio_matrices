import express from 'express';
import path from 'path';


const app = express();

const __dirname = path.resolve();

app.use('/public', express.static(__dirname + '/public'));

app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
}
);

app.post('/calcular', function (req, res) {
    const matriz1 = req.body.matriz1;
    const matriz2 = req.body.matriz2;
   

    const matrizSuma = matriz1.map((row, j) => {
        return row.map((col, i) => {
            if (!isNaN(col) || !isNaN(matriz2[j][i])){
                res.status(400).json({ error: 'Las matrices deben contener solo números' });
                return;
            }
            return parseInt(col) + parseInt(matriz2[j][i]);
        });
    });

    console.log(matrizSuma);
    res.json({ matrizSuma : matrizSuma });
});

app.listen(3000, function () {
    console.log(`Aplicación ejemplo, escuchando en http://localhost:3000/`);
});