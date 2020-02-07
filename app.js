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
    //some code later
})();

//APP CONTROLLER
var appController = (function(budgetCtrl, UICtrl) {
    //Setup the event listener
    document.querySelector('.add__btn').addEventListener('click', function(){
        //1. Get the field input data
        //2. Add the item to the budget controller
        //3. Add the new item to the UI
        //4. Calculate the budget
        //5. Display the budget on the UI
    });

//Add the 'keypress' event listener to the global document

document.addEventListener('keypress', function(event){

});
    
})(budgetController, UIController);