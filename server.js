const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 8000;

// app.use(express.static('.'))

const readFileAsync = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

app.get('/parrot*',  (req, res) => {
    console.log('REQ PATHHH', req.path, req.method)
    readFileAsync(__dirname + req.path)
    .then((file) => {
      res.set('Content-Type', 'image/jpeg')
      res.send(file)
    })
})
app.get('/',  (req, res) => {
    readFileAsync(__dirname + '/index.html')
    .then((file) => {
      res.set('Content-Type', 'text/html')
      res.send(file)
    })
})


// app.get('/parrot2.jpg',  (req, res) => {
//     readFileAsync(__dirname + '/parrot2.jpg')
//     .then((file) => {
//       res.set('Content-Type', 'image/jpeg')
//       res.send(file)
//     })
// })

app.listen(PORT, () => console.log(`Listening ${PORT}`))
