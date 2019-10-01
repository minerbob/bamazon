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
    password: "Password10",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    display();
});


function display() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("item_id: " + res[i].item_id + " || product_name: " + res[i].product_name
                + " || price: " + res[i].price
                + " || stock_quantity: " + res[i].stock_quantity);
        }
        start();
    });

}

function start() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the product they would like to buy"
            },
            {
                name: "amount",
                type: "input",
                message: "how many units of the product they would like to buy?"
            }

        ])
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE ?";
            // when finished prompting, insert a new item into the db with that info
            connection.query(query, { item_id: answer.item }, function (err, res) {
                if (err) throw err;
                var passUp = res[0];

                    if (res[0].stock_quantity >= answer.amount) {

                        var query = connection.query(
                           
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: res[0].stock_quantity - answer.amount
                                },
                                {
                                    item_id: answer.item
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                console.log("You purchased the goods for $" + (passUp.price * answer.item) +  "\n");
                                display();

                            }
                        );


                    }
                    else {
                        console.log("Not enough Product To buy \n")
                        display();
                    }
                

            });
        });
}


