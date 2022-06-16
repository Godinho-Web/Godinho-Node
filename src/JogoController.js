exports.post = async (req, res) => {
    const conn = await connect();
    const sql = 'INSERT INTO jogo(descricao, tipo, datalanc) VALUES(?,?,?)';

    const values = [req.body.descricao, req.body.tipo, req.body.datalanc];
    await conn.query(sql, values);
    res.status(201).send('Inserido com sucesso !');
};

exports.put = async (req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = 'UPDATE jogo SET descricao=?, tipo=?, datalanc=? WHERE id = ?';

    const values = [req.body.descricao, req.body.tipo, req.body.datalanc, id];
    await conn.query(sql, values);
    res.status(201).send('Alterado com sucesso !');
 };

exports.delete = async (req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = 'DELETE FROM jogo WHERE id = ?';

    const values = [id];
    await conn.query(sql, values);
    res.status(200).send('Excluído com sucesso !');
 };


exports.get = async (req, res, next) => {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM jogo');
    res.status(200).send(rows);
};

exports.getById = async (req, res, next) => {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM jogo WHERE id = ' + req.params.id);
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("ID não existe");
    }
 };


async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

    const mysql = require("mysql2/promise");

    const connection = await
    mysql.createConnection({host:'localhost', user: 'root', password: 'masterkey', database: 'bdjogos'});

    console.log("Conectou no MySQL !");
    global.connection = connection;
    return connection;
}