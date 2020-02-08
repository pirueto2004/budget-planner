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

    //private variable and function in the Closure
    

    //Object is returned in the budgetController variable
        
})();

//UI CONTROLLER
var UIController = (function() {
    var DOMstrings = {
        inputType : '.add__type',
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

    //import the DOMstrings from UIController
    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function() {
        //1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);
        //2. Add the item to the budget controller
        //3. Add the new item to the UI
        //4. Calculate the budget
        //5. Display the budget on the UI
        console.log('It works');
    }
    //Setup the event listener
    document.querySelector(DOM.inputAddBtn).addEventListener('click', ctrlAddItem);

//Add the 'keypress' event listener to the global document

document.addEventListener('keypress', function(event){
    // console.log(event);
    if (event.keycode === 13 || event.which === 13) {
       ctrlAddItem();
    }
});
    
})(budgetController, UIController);