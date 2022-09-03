const callCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategory(data.data.news_category))
    .catch((error) => console.log(error));
};

callCategory();

const showCategory = (data) => {
  const category = document.getElementById("category");
  data.forEach((categoryData) => {
    const { category_name, category_id } = categoryData;
    const li = document.createElement("li");
    li.classList.add("text-xl");

    li.innerHTML = `
    <div id="${category_id}" onclick="newsData(this)">${category_name}</div>
      `;
    category.appendChild(li);
  });
};

const newsData = async (element) => {
  //   console.log(element.id);
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");
  spinner.classList.add("flex");
  fetch(`https://openapi.programming-hero.com/api/news/category/${element.id}`)
    .then((res) => res.json())
    .then((data) => newsDetails(data.data, element))
    .catch((error) => console.log(error));
};

const newsDetails = (data, element) => {
  //   reverseData = data.sort("total_view");
  const sortedArray = data.sort((a, b) =>
    a.total_view < b.total_view ? 1 : -1
  );
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("flex");
  spinner.classList.add("hidden");
  const categoryLength = document.getElementById("category-length");
  categoryLength.innerHTML = `
    <h1 class="p-5 text-xl">${
      data.length === 0 ? "No" : data.length
    } items found for category ${element.innerText}</h1>
    `;
  const newsCart = document.getElementById("news-cart");
  newsCart.innerHTML = ``;
  data.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
              <div class="card card-side bg-base-100 shadow-xl my-5">
                <figure>
                  <img src=${news.thumbnail_url} class="p-3 w-52" alt="Movie" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${news.title}</h2>
                  <p>${
                    news.details.length > 300
                      ? news.details.slice(0, 300) + "..."
                      : news.details
                  }</p>
                  <div class="card-actions flex justify-between items-center">
                    <div class="flex items-center">
                        <img src=${
                          news.author.img
                        } alt="" class="rounded-full w-10 mx-3"/>
                        <h1>${
                          news.author.name === null
                            ? "No data found"
                            : news.author.name?.length === 0
                            ? "No data found"
                            : news.author.name
                        }</h1>
                    </div>
                    <div class="flex items-center">
                        <i class="fa-solid fa-eye mx-3"></i>
                        <p>${
                          news.total_view === null
                            ? "No data found"
                            : news.total_view
                        }</p>
                    </div>
                    <label for="my-modal-3" id="${
                      news._id
                    }" onclick="callModal(this)" class="btn modal-button">Read More</label>
                  </div>
                </div>
              </div>
          `;
    newsCart.appendChild(div);
  });
};

const callModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${id.id}`)
    .then((res) => res.json())
    .then((data) => openModal(data.data))
    .catch((error) => console.log(error));
};

const openModal = (data) => {
  //   console.log(data);
  const modal = document.getElementById("modal");
  modal.innerHTML = ``;
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-box");
  modalDiv.classList.add("relative");
  modalDiv.innerHTML = `
    <label
    for="my-modal-3"
    class="btn btn-sm btn-circle absolute right-2 top-2"
    >✕</label>
    <h3 class="text-lg font-bold">
    ${data[0].title}
    </h3>
    <img src=${data[0].image_url} alt="" class="w-full"/>
    <p class="py-4">
    ${data[0].details}
    </p>
    <div class="flex justify-between items-center">
        <div class="flex items-center">
            <img src=${
              data[0].author.img
            } alt="" class="rounded-full w-10 mx-3"/>
            <div>
                <h1>${
                  data[0].author.name === null
                    ? "No data found"
                    : data[0].author.name?.length === 0
                    ? "No data found"
                    : data[0].author.name
                }</h1>
                <p>${data[0].author.published_date}</p>
            </div>
        </div>
        <div class="flex items-center">
           <h2>Rating: ${data[0].rating.number}</h2>
        </div>
    </div>
  `;
  modal.appendChild(modalDiv);
};
