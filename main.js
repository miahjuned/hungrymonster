
const getSearchValue = () => {
  const searchValue = document.getElementById("search_input").value;
  if (!searchValue) {
    document.getElementById("rowArea").innerHTML =
      "<h1>Please type your food name!</h1>";
  } 
  else {
    document.getElementById("rowArea").innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      const food = data.meals;
      food.map((element) => {
        const row = document.getElementById("rowArea");
        const foodContainer = document.createElement("div");
        foodContainer.setAttribute("class", "col col-style");
        const foodName = element.strMeal;
        const foodImg = element.strMealThumb;
        const foodId = element.idMeal;

        const foodDiv = `<div class="card card-style " onclick="getmealDetails(${foodId})" style="width: 14rem;"><img class="card-img-top" src="${foodImg}" alt="Card Food Image">
          <div class="card-body"><h6 class="card=text">${foodName}</h6></div>`;
          foodContainer.innerHTML = foodDiv;
          row.appendChild(foodContainer);
      });
    })
    .catch((error) => {
      document.getElementById("rowArea").innerHTML="<h1>Wrrong! please try again.</h1>";
    });
  }
};




const getmealDetails = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals;
      meal.map((element) => {
        const foodImg = element.strMealThumb;
        const foodDetailsContainer = document.createElement("div");
        const foodDetailsDiv = `<div class="card p-4 w-75 shadow-lg rounded-3" > <img src="${foodImg}" alt="Food Card image>
            <div class="card-body"">
            <h4 class="card-title">${element.strMeal}</h4>
            <h5>Ingredient</h5>
            <h6 class="card-text"> > ${element.strIngredient1}</h6> <h6 class="card-text"> > ${element.strIngredient2}</h6>
            <h6 class="card-text"> > ${element.strIngredient3}</h6> <h6 class="card-text"> > ${element.strIngredient4}</h6> 
            <h6 class="card-text"> > ${element.strIngredient5}</h6> <h6 class="card-text"> > ${element.strIngredient6}</h6>
            <h6 class="card-text"> > ${element.strIngredient7}</h6> <h6 class="card-text"> > ${element.strIngredient8}</h6>
            <h6 class="card-text"> > ${element.strIngredient9}</h6> <h6 class="card-text"> > ${element.strIngredient10}</h6>

            <button class="btn btn-info"  onclick="backHome()" id="back-search"> < Back</button>
            </div>
         </div>`;
        foodDetailsContainer.innerHTML = foodDetailsDiv;
        document
          .getElementById("search-food")
          .appendChild(foodDetailsContainer);
        document.getElementById("all-food").style.display = "none";
      });
    });
};



const backHome = () => {
  document.getElementById("all-food").style.display = "block";
  document.getElementById("search-food").innerHTML = "";
  document.getElementById("rowArea").innerHTML = "";
  document.getElementById("search_input").value = "";
};

