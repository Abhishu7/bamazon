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
        head: ["Item ID", "Product", "Department", "Price", "Quantity"],
        colWidths: [10,15,15,10,14]
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

  function orderItems(item, quantity){
    connection.query('Select * FROM products WHERE ?', [{item_id: item}], function(err,res){
      console.log(res);
      var nowThis = res[0]
      console.log(quantity);
      console.log(nowThis.stock_quantity);
      if(err){console.log(err)};
      if(quantity <= nowThis.stock_quantity){
        var totalValue = nowThis.price * quantity;
        console.log("Items are in stock!");
        console.log("Total price of " + quantity + " " + nowThis.product_name + " is " + totalValue);
        var newQuantity = nowThis.stock_quantity - quantity;
  
        connection.query("UPDATE products SET ? WHERE ?" , [{stock_quantity: newQuantity}, {item_id: item}], function(err){
          if(err){console.log(err)};
          console.log("Purchase Succesful!")
          displayItems();
        });
      } else{
        console.log("Insufficient quantity! Sorry, come again!");
        displayItems();
      };
    });
  };
  
 

  


  