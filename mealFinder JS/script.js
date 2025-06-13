const hamburgerMenu = document.getElementById("hamburgerMenu");
const categoryList = document.getElementById("categoriesList");
const closeBtn = document.getElementById("closeIcon");
console.log(hamburgerMenu);
console.log(categoryList);
console.log(closeBtn);


hamburgerMenu.addEventListener("click", () => {
    categoryList.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
    categoryList.classList.toggle("active");
}
);

