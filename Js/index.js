const callCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategory(data.data.news_category));
};

callCategory();

const showCategory = (data) => {
  data.forEach((categoryData) => {
    const { category_name, category_id } = categoryData;
    const category = document.getElementById("category");
    const li = document.createElement("li");
    li.classList.add("text-xl");

    li.innerHTML = `
    <div id="${category_id}" onclick="newsData(this)">${category_name}</div>
      `;
    category.appendChild(li);
  });
};

const newsData = async (element) => {
  console.log(element.id);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${element.id}`
  );
  const data = await response.json();
  return data;
};
