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
const budgetController = ( () => {

    //private variables and functions in the Closure
    //ES6 Function Constructor for Expense 
    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
            //non existent yet
            this.percentage = -1;
        }
        calcPercentage(totalIncome) {
            if (totalIncome > 0) {
                this.percentage = Math.round((this.value / totalIncome) * 100);
            }
            else {
                this.percentage = -1;
            }
        }
        getPercentage() {
            return this.percentage;
        }
    }



    //ES6 Function Constructor for Income
    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };

    //Function Constructor for totals
    const calculateTotal = type => {
        let sum = 0;
        data.allItems[type].forEach( (current) => {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    //data structure for storing all expenses, incomes and totals
    const data = {
        allItems : {
            exp: [],
            inc: []
        },
        totals : {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 //non existent value
    };

    //Object is returned in the budgetController variable
    return {
        addItem: (type, des, val) => {
            let newItem, ID;

            //last item in the array
            const last = data.allItems[type].length - 1;

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

        deleteItem: (type, id) => {
            let ids, index;
            //map() loops over an array but returns a brand new array
            ids = data.allItems[type].map((current, index, array) => {
                return current.id;
            });

            index = ids.indexOf(id);

            //Delete item only if index exists

            if (index !== -1) {

                //Remove 1 element starting at position 'index' 
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: () => {
            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc > 0) {
                //Calculate the percentage of income that we spent
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100) ; //Rounds the number to the closest integer
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: () => {
            data.allItems.exp.forEach( current => {
                current.calcPercentage(data.totals.inc);
            })
        },

        getPercentages: () => {
            let allPercentages = data.allItems.exp.map((current) => {
                return current.getPercentage();
            });
            return allPercentages;
        },

        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: () => {
            console.log(data);
        }
    };
        
})();

//UI CONTROLLER
const UIController = (() => {
    const DOMstrings = {
        inputType : '.add__type', //will be either 'inc' or 'exp'
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputAddBtn : '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
        
    };

    //private function
    const formatNumber = (num, type) => {
        let numSplit, int, dec;
       /*
       + or - before the number
       exactly 2 decimal points
       comma separating the thousands
       2310.4567 --> + 2,310.46
       2000      --> + 2,000.00
       */

       num = Math.abs(num); //Absolute number
       num = num.toFixed(2); //adds 2 decimal points
       numSplit = num.split('.'); //Splits the number string in the separator '.' by converting the string into two substrings and storing substrings in an array 
       int = numSplit[0]; //First element in the array is the integer part of the number
       if (int.length > 3) {
           int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 2310 output 2,310  --- input 23510 output 23,510
       }
       dec = numSplit[1]; //Second element in the array is the decimal part of the number

       //type === 'exp' ? sign = '-' : sign = '+';

       return (type === 'exp' ? '-' :  '+') + ' ' + int + '.' + dec; //returns the formatted number

    };

    //private function
    const nodeListForEach = (list, callback) => {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
       
    };

    return {
        getInput: () => {
            //return an object containing all of the three input values
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value), //convert value from String to a Decimal number using parseFloat()
            }
        },

        addListItem: (obj, type) => {
            let html, newHtml, element;
            //Create HTML string with placeholder text

            

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            //Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            //Insert the HTML into the DOM. Element will be inserted as child of the container
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: (selectorID) => {
            const elem = document.getElementById(selectorID);
            elem.parentNode.removeChild(elem);
        },

        clearFields : () => {
            
            //fields will be a list of all the elements selected
            const fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            //convert the list into an array using the Array function constructor's prototype property, borrowing the array slice method.
            const fieldsArray = Array.prototype.slice.call(fields);

            //Loop over the fieldsArray to clear them all
            fieldsArray.forEach((current, index, array) => {
                current.value = "";
            }); 

            //set focus back to the first element on the array
            fieldsArray[0].focus();
        },

        displayBudget: obj =>  {
            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },

        displayPercentages: percentages =>  {

            const fields = document.querySelectorAll(DOMstrings.expensesPercLabel); //This returns a nodeList  (a list of HTML elements)

            nodeListForEach(fields, (current, index) => {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: () => {
            let now, month, monthNames, year;

            monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            now = new Date(); //returns today's date object
            //var christmas = new Date(2020, 11, 25); returns Christmas date in 2020

            month = now.getMonth();

            year = now.getFullYear();

            // console.log(year);

            document.querySelector(DOMstrings.dateLabel).textContent = monthNames[month] + ' ' + year;
        },

        changedType: () => {

            const fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, (current, index) => {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputAddBtn).classList.toggle('red');

        },


        //Exposing the DOMstrings into the public
        getDOMstrings : () => {
            return DOMstrings;
        }
    };
})();

//GLOBAL APP CONTROLLER
const appController = ( (budgetCtrl, UICtrl) => {

    const setUpEventListeners = () => {

        //import the DOMstrings from UIController
        const DOM = UICtrl.getDOMstrings();

        //Setup the event listener
        document.querySelector(DOM.inputAddBtn).addEventListener('click', ctrlAddItem);

        //Add the 'keypress' event listener to the global document

        document.addEventListener('keypress', event => {
            // console.log(event);
            if (event.keycode === 13 || event.which === 13) {
            ctrlAddItem();
            }
        });

        //Attach event handler to the parent element '.container' of all the '.income' and '.expenses' elements

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        //Event listener for a 'change' on the select element with class='add__type'

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

    };

    const updateBudget = () => {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget
        const budget = budgetCtrl.getBudget();

        //3. Display the budget on the UI
        // console.log(budget);
        UICtrl.displayBudget(budget);

    };

    const updatePercentages = () => {

        //1. Calculate percentages
        budgetCtrl.calculatePercentages();

        //2. Read percentages from the budget controller
        const percentages = budgetCtrl.getPercentages();
        
        //3. Update the UI with the new percentages
        console.log(percentages);
        UICtrl.displayPercentages(percentages);

    };

    const ctrlAddItem = () => {
        //variable declaration
        let input, newItem;

        //1. Get the field input data
        input = UICtrl.getInput();
            // console.log(input);
        
        //Prevent false inputs
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update the budget
            updateBudget();

            //6. Calculate and update percentages
            updatePercentages();
        }
    };

    //We use the event object to get the target element where the event was fired
    const ctrlDeleteItem = event => {
        let itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            // console.log(itemID);
            //inc-1 or exp-1   
            splitID = itemID.split('-'); //This splits 'inc-1' into 'inc' '1'
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1.Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            //2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            //3. Update and show the new budget
            updateBudget();

            //4. Calculate and update percentages
            updatePercentages();
        }
        
    };
    
    //public object to return
    return {
        init : () => {
            console.log('Application has started!');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setUpEventListeners();
        }
    };
    
    
})(budgetController, UIController);

//init function outside the appController
appController.init();