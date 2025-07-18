
  // Get references to all needed DOM elements
const hamburgerMenu = document.getElementById("hamburgerMenu");
const categoriesList = document.getElementById("categoriesList");
const closeIcon = document.getElementById("closeIcon");
const searchBar = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const container = document.getElementById("mealContainer");
const categoriesSection = document.getElementById("categoriesSection");
const mealDetailsPage = document.getElementById("mealDetailsPage");
const backButton = document.getElementById("backButton");
const mealTitle = document.getElementById("mealTitle");
const mealDescription = document.getElementById("mealDescription");
const mealImageLarge = document.getElementById("mealImageLarge");
const ingredientsList = document.getElementById("ingredientsList");
const measurementsList = document.getElementById("measurementsList");
const mealInstructions = document.getElementById("mealInstructions");

// Store all fetched categories
let allCategories = [];

// Toggle hamburger menu visibility
hamburgerMenu.addEventListener("click", () => {
  categoriesList.classList.toggle("active");
});

// Close the hamburger menu
closeIcon.addEventListener("click", () => {
  categoriesList.classList.remove("active");
});

// Back button hides details page
 
   
   
   function fetchMealDetails(id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]));
    }

    function displayMealDetails(meal) {
      categoriesSection.style.display = "none";
      mealDetailsPage.style.display = "block";
      mealTitle.textContent = meal.strMeal;
      mealDescription.textContent = meal.strCategory;
      mealImageLarge.src = meal.strMealThumb;
      ingredientsList.innerHTML = "";
      measurementsList.innerHTML = "";
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`]?.trim();
        const meas = meal[`strMeasure${i}`]?.trim();
        if (ing) {
          const li1 = document.createElement("li");
          li1.textContent = ing;
          ingredientsList.appendChild(li1);
          if (meas) {
            const li2 = document.createElement("li");
            li2.textContent = meas;
            measurementsList.appendChild(li2);
          }
        }
      }
      mealInstructions.textContent = meal.strInstructions;
    }

    document.querySelectorAll('#categoriesList li').forEach(item => {
      item.addEventListener('click', () => {
        categoriesList.classList.remove("active");
        showMealsView();
        fetchMealsByCategory(item.textContent, "");
      });
    });

    searchButton.addEventListener("click", handleSearch);
    searchBar.addEventListener("input", handleSearch);
    searchBar.addEventListener("keypress", e => {
      if (e.key === "Enter") handleSearch();
    });

    function handleSearch() {
      const inputText = searchBar.value.toLowerCase().trim();
      if (!inputText) return displayCategories(allCategories);
      const filtered = allCategories.filter(cat => cat.strCategory.toLowerCase().includes(inputText));
      if (filtered.length) displayCategories(filtered);
      else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
          .then(res => res.json())
          .then(data => {
            if (data.meals) displayMeals(data.meals, `Search "${inputText}"`, "");
            else container.innerHTML = `<p class="text-center">No results for "${inputText}".</p>`;
          });
      }
    }

 

 
 
