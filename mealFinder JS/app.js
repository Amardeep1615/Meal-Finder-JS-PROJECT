



// fetch ("https://www.themealdb.com/api/json/v1/1/categories.php")
//  .then((response) => response.json())
//  .then((data) => {
//     const mealFinder = data.categories;
//     console.log(mealFinder)
//     mealFinder.forEach( (meal) => {
//         console.log("id:",meal.idCategory);
//         console.log("Name:",meal.strCategory);
//          console.log("Img:", meal.strCategoryThumb)
//          console.log("Description:", meal.strCategoryDescription)
        
//     });
//  })
//  .catch((error) => {
//     console.error("Error fetching meal data:", error);
//  });

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

    let allCategories = [];

    hamburgerMenu.addEventListener("click", () => {
      categoriesList.classList.toggle("active");
    });

    closeIcon.addEventListener("click", () => {
      categoriesList.classList.remove("active");
    });

    backButton.addEventListener("click", () => {
      categoriesSection.style.display = "block";
      mealDetailsPage.style.display = "none";
    });

    function showMealsView() {
      categoriesSection.style.display = "block";
      mealDetailsPage.style.display = "none";
    }

    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => {
        allCategories = data.categories;
        displayCategories(allCategories);
      });

    function displayCategories(categories) {
      container.innerHTML = "";
      categories.forEach(category => {
        const card = document.createElement("div");
        card.className = "meal-card";
        card.innerHTML = `
          <div class="card shadow-sm p-2 position-relative rounded-3 overflow-hidden">
            <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strCategory}"
                 data-category="${category.strCategory}" data-description="${category.strCategoryDescription}">
            <div class="promo-banner position-absolute top-0 end-0 text-white px-2 py-1">
              ${category.strCategory}
            </div>
          </div>`;
        container.appendChild(card);
      });

      document.querySelectorAll('.card-img-top').forEach(img => {
        img.addEventListener('click', e => {
          const cat = e.target.getAttribute('data-category');
          const desc = e.target.getAttribute('data-description');
          showMealsView();
          fetchMealsByCategory(cat, desc);
        });
      });
    }

    function fetchMealsByCategory(category, description) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals, category, description));
    }

    function displayMeals(meals, category, description) {
      container.innerHTML = `
        <div class="col-12 mb-4">
          <div class="meal-header">
            <h1>${category}</h1>
            <p>${description}</p>
          </div>
        </div>`;
      meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "meal-card";
        card.innerHTML = `
          <div class="card shadow-sm p-2 position-relative rounded-3 overflow-hidden">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" data-mealid="${meal.idMeal}">
            <div class="promo-banner position-absolute top-0 end-0 text-white px-2 py-1">
              ${meal.strMeal}
            </div>
          </div>`;
        container.appendChild(card);
      });

      document.querySelectorAll('.card-img-top').forEach(img => {
        img.addEventListener('click', e => {
          const id = e.target.getAttribute('data-mealid');
          fetchMealDetails(id);
        });
      });
    }

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

 

 
 
