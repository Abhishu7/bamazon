var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(error){
    if(error) throw error;
    console.log("connected as id" + connection.threadId);
  });
 
  var displayItems = function(){
    var query = "Select * FROM products";
    connection.query(query, function(err, res){
      if(err) throw err;
      var displayTable = new Table ({
        head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
        colWidths: [10,25,25,10,14]
      });
      for(var i = 0; i < res.length; i++){
        displayTable.push(
          [res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
          );
      }
      console.log(displayTable.toString());
      purchaseItems();
    });
  }
  displayItems();

  function purchaseItems(){
    inquirer.prompt([
    {
      type: "input",
      name: "item",
      message:"Enter Item ID of item requested",
    },
    {
      type:"input",
      name:"quantity",
      message:"Enter quantity requested",
    },
  
   ]).then(function(answers){
    var itemRequested = answers.item;
    var quantityNeeded = answers.quantity;
    orderItems(itemRequested, quantityNeeded);
   });
  };


 

  


  