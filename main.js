import html2canvas from "html2canvas";

// find elements
const app = document.getElementById("app");
const dropdown = document.getElementById("dropdown-button");
const dropdownMenu = document.querySelector(".dropdown-content");
const generateButton = document.getElementById("generate-button");
const radioButtons = document.querySelectorAll('input[type="radio"]');
const articleTitle = document.getElementById("article-title");
const articleImg = document.getElementById("article-img");
const articleContent = document.getElementById("article-content");
const articleElement = document.querySelector(".article");
const downloadDiv = document.querySelector(".download");
const downloadButton = document.getElementById("download-button");
const articleEndpoint = `https://letsgeneratearticles.com/article?key=AIzaSyD5&category=`;

const getCurrentCategory = () => {
  const checkedRadio = Array.from(radioButtons).find((radio) => radio.checked);
  return checkedRadio.value;
};
const captureScreen = async () => {
  const weblink = document.createElement("p");
  weblink.id = "weblink";
  weblink.textContent = "aguizaro.github.io/ArticleGenerator/";
  downloadDiv.appendChild(weblink);

  const articleScreen = await html2canvas(articleElement, {
    logging: true,
    ignoreElements: (element) => element.id === "download-button",
    backgroundColor:
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#242424"
        : "#ffffff",
  });
  //download the screnshot
  const link = document.createElement("a");
  link.href = articleScreen.toDataURL();
  link.download = "article-screenshot.png";
  link.click();
  weblink.remove();
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
    articleImg.src = `data:image/jpeg;base64,${data.response.urlToImage}`;
    articleContent.textContent = data.response.content;

    generateButton.disabled = false;
    dropdownMenu.classList.remove("is-active");
  } catch (error) {
    console.error(error);
    generateButton.disabled = false;
  }
};

const downloadArticle = async () => {
  try {
    downloadButton.disabled = true;
    await captureScreen();
    downloadButton.disabled = false;
  } catch (error) {
    console.error(error);
    downloadButton.disabled = false;
  }
};

dropdown.addEventListener("click", () => {
  dropdownMenu.classList.toggle("is-active");
});

generateButton.addEventListener("click", generateArticle);

downloadButton.addEventListener("click", downloadArticle);
