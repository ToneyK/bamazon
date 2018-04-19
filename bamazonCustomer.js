//DEPENDENCIES
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//CONNECTION
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});
connection.connect(function (err) {
  if (err) throw err;
  displayAll(purchaseFromDatabase);
});

//FUNCTIONS
function displayAll() {
	// SHOW NAMES, IDS AND PRODUCTS FROM THE DATABASE
	console.log('Showing all products available for sale. \n');
	connection.query('SELECT * FROM products', function (err, res) {
		if (err) { console.log(err) };
		//NEW CONSTRUCTOR
		var displayTable = new Table({
			//VALUES OF CATEGORIES
			head: ['Item ID', 'Product Name', 'Department', 'price', 'Quantity'],
			colWidths: [10, 30, 18, 10, 14]
		});
		//FOR LOOP TO PUSH DATA TO THE TABLE
		for (let i = 0; i < res.length; i++) {
			displayTable.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}
		//CONSOLE LOG THE TABLE WHEN COMPLETED
		console.log(displayTable.toString());
		queryForPurchase();
	})
};//end of displayAll

function queryForPurchase() {
	//GET ITEM_ID AND AMOUNT FROM USER. 	
	inquirer.prompt([
		{
			name: "id",
			type: "input",
			message: "What would like to purchase?"
		}, {
			name: 'quantity',
			type: 'input',
			message: "How many would you like?"
		},

	]).then(function (answers) {
		//SET INPUT AS VARIBALE, PASS VARIABLES AS PARAMS
		var quantityDesired = answers.Quantity;
		var IDDesired = answers.ID;
		purchaseFromDatabase(IDDesired, quantityDesired);
	});

};//END OF QUERYFORPURCHASE

function purchaseFromDatabase(ID, quantityNeeded) {
	//CHECKING QUANTITY OF IN STOCK FOR PURCHASE. MINUS QUANTITY OF THE ITEM_ID FROM THE DATABASE IF POSSIBLE. ELSE TELL USER "ITEM NOT IN STOCK"

	connection.query('SELECT * FROM products WHERE item_id = ?',[ID], function (err, res){
		if (err) { console.log(err) };
		//IF IN STOCK
		if (quantityNeeded <= res[0].stock_quantity) {
			//GET COST
			var totalCost = res[0].price * quantityNeeded;
			console.log("We have what you need! Thank you!");
			console.log("Your total cost for " + quantityNeeded + " " + res[0].product_name + " is " + totalCost + ". Thank you for your Business!");
			//UPDATE DATABASE, MINUS PURCHASED QUANTITY
			connection.query('UPDATE Products SET stock_quantity = stock_quantity - ' + quantityNeeded + ' WHERE ItemID = ' + ID);
		} else {
			console.log("Our apologies. We don't have enough " + res[0].product_name + " to fulfill your order.");
		};
		displayAll();//RECUSIVE FUNCTION
	});

}; //END OF PURCHASEFROMDATABASE


