const form = document.querySelector('.js-food-form');
const inputField = document.querySelector('.js-food-input');
const foodContainer = document.querySelector('.js-food-container');


//https://www.themealdb.com/

console.log('Javascript is running')

function callback(event) {
  event.preventDefault(); //first thing in the form
  //event,stopPropagation(); //in case of other events - read bubbling
  //alert('form got submitted');
  const searchExpression = encodeURIComponent(inputField.Value).replaceAll('%20', ' ');
  foodContainer.innerHTML = `Form Got Submitted with content ${searchExpression}`;
  inputField.Value = '';
}

form.addEventListener('submit', callback);

//monitoring function
/*
function f() {
  //adds keylogger
  //logs keystrokes on enter

}
*/

