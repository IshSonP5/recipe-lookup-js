const form = document.querySelector('.js-food-form');
const inputField = document.querySelector('.js-food-input');
const foodContainer = document.querySelector('.js-meal-list-container');

// encodeURIComponent(inputField.Value).replaceAll('%20', ' ');


// https://www.themealdb.com/api/json/v1/1/search.php?s=Pie

console.log('Javascript is running')

function getSourceMarkup(meal) {
  let source = meal.strSource;
  if (source === null || source === '') {
      return '';
  }
  else { //dont need an else here strictly speaking
      return `
        <p>
        <a href="${source}" target="_blank">Source</a>
        </p>
      `;
  }
}

function getTagsMarkup(meal) {
  let tags = meal.strTags?.replaceAll(',', ', ');
    if (typeof tags === 'undefined') {
      return '';
    } 
    else {
      return `<p>Tags: ${tags}</p>`
    }
}

function getMealMarkup(meal) {
  return `
    <div class="meal-container">
      <h2>${meal.strMeal}</h2>
      <img 
        src="${meal.strMealThumb}" 
        alt="${meal.strMeal}" 
        class="meal-thumbnail" />
      ${getTagsMarkup(meal)}
      ${getSourceMarkup(meal)}       
    </div>`;
}

function renderRecipe(result) {
  let meals = result.meals;
  let html = '';
  for (let meal of meals) {
    html += getMealMarkup(meal); 
  }
  foodContainer.innerHTML = html;
}

function getRecipe(recipe) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
  fetch(url)
    .then(data => data.json())
    .then(renderRecipe);
}

function callback(event) {
  event.preventDefault(); //first thing in the form
  //event,stopPropagation(); //in case of other events - read event bubbling
  const searchExpression = encodeURIComponent(inputField.value).replaceAll('%20', ' ');
  getRecipe(searchExpression);
  inputField.value = '';
}

form.addEventListener('submit', callback);