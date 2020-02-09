//Implement the module pattern to organize data using the IIFE to create data privacy

// var budgetController = (function() {

//     //private variable and function in the Closure
//     var x = 23;
//     var add = function(a) {
//         return x + a;
//     }

//     //Object is returned in the budgetController variable
//     return {
//         //public function
//         publicTest: function(b){
//             return add(b);
//         }
//     }
// })();

// var UIController = (function() {
//     //some code later
// })();

// var appController = (function(budgetCtrl, UICtrl) {
//     var z = budgetController.publicTest(5);
//     return {
//         anotherPublic: function() {
//             console.log(z);
//         }
//     }
// })(budgetController, UIController);

// console.log(appController.anotherPublic());


//BUDGET CONTROLLER
var budgetController = (function() {

    //private variables and functions in the Closure

    //Function Constructor for Expense 
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    //Function Constructor for Income
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //data structure for storing all expenses, incomes and totals
    var data = {
        allItems : {
            exp: [],
            inc: []
        },
        totals : {
            exp: 0,
            inc: 0
        }
    };

    //Object is returned in the budgetController variable
    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //last item in the array
            var last = data.allItems[type].length - 1;

            //if array is not empty create new ID
            if (data.allItems[type].length > 0) {
                //Create new ID
                ID = data.allItems[type][last].id + 1;
            //if array is empty set ID to zero    
            } else {
                ID = 0;
            }
            

            //Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            //add new item into the corresponding array
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };
        
})();

//UI CONTROLLER
var UIController = (function() {
    var DOMstrings = {
        inputType : '.add__type', //will be either 'inc' or 'exp'
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputAddBtn : '.add__btn'
    };

    return {
        getInput: function() {
            //return an object containing all of the three input values
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            }
        },
        //Exposing the DOMstrings into the public
        getDOMstrings : function() {
            return DOMstrings;
        }
    };
})();

//APP CONTROLLER
var appController = (function(budgetCtrl, UICtrl) {

    var setUpEventListeners = function() {

        //import the DOMstrings from UIController
        var DOM = UICtrl.getDOMstrings();

        //Setup the event listener
        document.querySelector(DOM.inputAddBtn).addEventListener('click', ctrlAddItem);

        //Add the 'keypress' event listener to the global document

        document.addEventListener('keypress', function(event){
            // console.log(event);
            if (event.keycode === 13 || event.which === 13) {
            ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function() {
        //variable declaration
        var input, newItem;
        //1. Get the field input data
        input = UICtrl.getInput();
            // console.log(input);
        //2. Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);
        //3. Add the new item to the UI
        //4. Calculate the budget
        //5. Display the budget on the UI
            // console.log('It works');
    }
    
    //public object to return
    return {
        init : function() {
            console.log('Application has started!');
            setUpEventListeners();
        }
    };
    
    
})(budgetController, UIController);

//init function outside the appController
appController.init();