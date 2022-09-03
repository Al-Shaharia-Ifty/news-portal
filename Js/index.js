const callCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategory(data.data.news_category));
};

callCategory();

const showCategory = (data) => {
  data.forEach((categoryData) => {
    const { category_name } = categoryData;
    console.log(categoryData);
    const category = document.getElementById("category");
    const li = document.createElement("li");
    // ul.classList.add("menu");
    // ul.classList.add("menu-horizontal");
    // ul.classList.add("p-0");

    li.innerText = `
    ${category_name}
      `;
    category.appendChild(li);
  });
};
