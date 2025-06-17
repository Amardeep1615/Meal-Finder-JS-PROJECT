

console.log("Meal Finder");

fetch ("https://www.themealdb.com/api/json/v1/1/categories.php")
 .then((response) => response.json())
 .then((data) => {
    const mealFinder = data.categories;
    console.log(mealFinder)
    mealFinder.forEach( (meal) => {
        console.log("id:",meal.idCategory);
        console.log("Name:",meal.strCategory);
         console.log("Img:", meal.strCategoryThumb)
         console.log("Description:", meal.strCategoryDescription)
        
    });
 })
 .catch((error) => {
    console.error("Error fetching meal data:", error);
 });


 

 
 
