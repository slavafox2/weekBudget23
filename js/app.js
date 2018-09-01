//class

class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }
    //substracktion from the budget
    substrackFromBudget(amount) {
        return this.budgetLeft = this.budgetLeft - amount;
    }
}




class HTML {
    //insert hte budget when the user submits it from promt
    insertBudget(amount){
        // insert into HTML
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    };
    printMessage(message, className){
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        //insert into base html
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm.nextSibling);
            //messageWrapper, addExpenseForm);

        //clear the error
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
            addExpenseForm.reset();
        }, 3000);
    };
    //displays the expenses fromt the form into the list
    addExpenseToList(name, amount){
        const expensesList = document.querySelector('#expenses ul');
        const li = document.createElement('li');
        li.innerHTML = `${name} <span class="badge badge-rimary badge-pill">$ ${amount}</span>`;
        expensesList.appendChild(li);
    };
    trackBudget(amount){
        const budgetLeftDollars = budget.substrackFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        //check when 25% is left
        if ((budget.budget / 4) > budgetLeftDollars) {
            
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        } else if ((budget.budget / 2) > budgetLeftDollars) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    };


    
}

// VARIABLES
const addExpenseForm = document.querySelector('#add-expense');
const budgetTotal = document.querySelector('span#total');
const budgetLeft = document.querySelector('span#left');


let budget, userBudget;
//instantiat HTLM class
const html = new HTML();

//event listeners
eventListeners();
function eventListeners() {

    //app initialization
    document.addEventListener('DOMContentLoaded', function () {
        //ask the visitor the weelky budget
        userBudget = prompt(`What's your budget for this week?`);
        //validate the userBudget
        if (userBudget === null || userBudget === '' | userBudget === '0') {
            window.location.reload();
        } else {
            // budget is valid then instantiate the budget class
            budget = new Budget(userBudget);

            //instantiate html class
            html.insertBudget(budget.budget);
        }
    });

    addExpenseForm.addEventListener('submit', function(event){
        event.preventDefault();

        //read input values
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === ''){
            console.log(html);
            html.printMessage('There was error, all the fields are mandatory', 'alert-danger');
        }else{
            //add expenses into the list
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Added...', 'alert-success');
        }
    });
};