const  JogoController = require('./JogoController');

module.exports = (app) => {
    app.post('/jogo', JogoController.post);
    app.put('/jogo/:id', JogoController.put);
    app.delete('/jogo/:id', JogoController.delete);
    app.get('/jogo', JogoController.get);
    app.get('/jogo/:id', JogoController.getById);
}