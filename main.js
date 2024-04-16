// find elements
const app = document.getElementById("app");
const dropdown = document.getElementById("dropdown-button");
const dropdownMenu = document.getElementsByClassName("dropdown-content")[0];
const generateButton = document.getElementById("generate-button");
const radioButtons = document.querySelectorAll('input[type="radio"]');
const articleTitle = document.getElementById("article-title");
const articleImg = document.getElementById("article-img");
const articleContent = document.getElementById("article-content");
const articleElement = document.getElementsByClassName("article")[0];
const articleEndpoint = `https://letsgeneratearticles/article?key=${process.env.ACCESS_KEY}&category=`;

const getCurrentCategory = () => {
  const checkedRadio = Array.from(radioButtons).find((radio) => radio.checked);
  return checkedRadio.value;
};

const generateArticle = async () => {
  try {
    generateButton.disabled = true;
    articleElement.classList.remove("is-active");

    const category = getCurrentCategory();
    const response = await fetch(`${articleEndpoint}${category}`);
    const data = await response.json();

    console.log(data.response);

    articleElement.classList.add("is-active");
    articleTitle.textContent = data.response.title;
    articleImg.src = data.response.urlToImage;
    articleContent.textContent = data.response.content;

    generateButton.disabled = false;
    dropdownMenu.classList.remove("is-active");
  } catch (error) {
    console.error(error);
    generateButton.disabled = false;
  }
};

dropdown.addEventListener("click", () => {
  dropdownMenu.classList.toggle("is-active");
});

generateButton.addEventListener("click", generateArticle);
