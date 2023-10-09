import { state } from "../main.js";
import { getBookID } from "./getBookById.js";
function drawBookSkeletons() {
  let { container } = state;
  for (let i = 0; i < 7; i++) {
    container.innerHTML += `
        <div class="book-card">
            <div class="book-card-image skeleton">
            </div>
            <div class="book-card-content">
              <h2 class="skeleton skeleton-text book-title"></h2>
              <h4 class="skeleton skeleton-text skeleton-text__body book-author"></h4>
              <h4 class="skeleton skeleton-text skeleton-text__body"></h4>
              <p class="skeleton skeleton-footer book-desc"></p>
              <button class="read-now">Read Now</button>
            </div>
        </div>
    `
  };
};

function drawBooks(data) {
  let { container } = state;
  container.innerHTML = "";
  if (sessionStorage.getItem("genre")) {
    const genres = document.querySelector("nav").querySelectorAll("li");
    genres.forEach(elem => {
      if (elem.textContent === sessionStorage.getItem("genre")) {
        elem.style.backgroundColor = `#fff`;
        elem.style.color = `#ff971d`;
        elem.style.borderLeft = `#ff971d solid`;
        elem.style.transitionDuration = "200ms";
      } else {
        elem.style.backgroundColor = `#f5f6f8`;
        elem.style.color = `black`;
        elem.style.borderLeft = `none`;
        elem.style.transitionDuration = "200ms";
      }
    });
  }
  data.forEach((elem) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    const bookCardImage = document.createElement("div");
    bookCardImage.classList.add("book-card-image", "skeleton");
    const bookCardContent = document.createElement("div");
    bookCardContent.classList.add("book-card-content");
    const bookCardContentElems = document.createElement("div");
    bookCardContentElems.classList.add("book-card-content-elems");
    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("margin");
    const bookAuthor = document.createElement("h2");
    bookAuthor.classList.add("book-author", "margin");
    const bookDesc = document.createElement("p");
    bookDesc.classList.add("book-desc");
    const bookButton = document.createElement("a");
    bookTitle.innerHTML = `${elem.volumeInfo.title.split(' ').slice(0, 5).join(' ')}`;
    bookAuthor.innerHTML = `${elem.volumeInfo.authors[0]}`;
    bookDesc.innerHTML = `${elem.volumeInfo.description.split('').slice(0, 60).join('')}...`;
    bookButton.href = `${elem.volumeInfo.previewLink}`;
    bookButton.target = `_blank`;
    bookButton.innerHTML = `<button class="read-now">Read Now</button>`;
    const img = document.createElement("img");
    img.src = `${elem.volumeInfo.imageLinks.thumbnail}`;
    img.addEventListener("click", () => {
      getBookID(elem.id);
    });
    bookCardImage.append(img);
    bookCardContentElems.append(bookTitle, bookAuthor, bookDesc);
    bookCardContent.append(bookCardContentElems, bookButton);
    bookCard.append(bookCardImage, bookCardContent);
    container.append(bookCard);
  });
};
export {
  drawBookSkeletons,
  drawBooks
};