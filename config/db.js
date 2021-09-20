
const Sequelize = require("sequelize");

const db = new Sequelize('store', 'hoso', '@Mazro3#910#2000', {
    hostname: "localhost",
    dialect: "mysql"
});

 db

    .authenticate()
    .then(() => {
        console.log(" connection has been esblished successfuly");
    })
    .catch(err => {
        console.log(" unable to connect");
    });

module.exports = db;

/*var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'hoso',
    password: '@Mazro3#910#2000',
    database: 'store'
});
con.connect(function (err) {
    if (err) throw err;

    console.log("connected!");
});
module.exports = {
    con: con,
}*/