var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(error){
    if(error) throw error;
    start()
  });
  
  function start(){
    var queryAll = 'SELECT * FROM products';
    connection.query(queryAll, function(error, response){
      if(error) throw error;
  
      console.table(response);

    })
  }
  
  