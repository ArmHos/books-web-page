import { state } from "../main.js";
import { filterData } from "./searchBooks.js";
import { drawBooks } from "./drawBooks.js";

async function getPopularBooks(genre) {
    let { API_KEY } = state;
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&lang=en&maxResults=10&key=${API_KEY}`);
        const data = await res.json();
        sessionStorage.setItem("search_data", JSON.stringify(filterData(data)));
        drawBooks(filterData(data));
    } catch (err) {
        throw new Error(err);
    }
};
function setElementStyles(element, bcgColor, color, border) {
    element.style.backgroundColor = `${bcgColor}`;
    element.style.color = `${color}`;
    element.style.borderLeft = `${border}`;
}
function getBooksByGenres() {
    const genres = document.querySelector(".genres").querySelectorAll("li");
    const myLibrary = document.querySelector(".my-library");
    let currentGenre = [];
    genres.forEach(genre => {
        genre.addEventListener("click", async () => {
            if (currentGenre.length === 0) {
                currentGenre.push(genre);
                sessionStorage.setItem("genre", genre.textContent);
                setElementStyles(genre, `#fff`, `#ff971d`, `#ff971d solid`);
            } else {
                currentGenre[0].style.backgroundColor = `#f5f6f8`;
                currentGenre[0].style.color = `black`;
                currentGenre[0].style.borderLeft = `none`;
                currentGenre.pop();
                setElementStyles(genre, `#fff`, `#ff971d`, `#ff971d solid`);
                sessionStorage.setItem("genre", genre.textContent);
                currentGenre.push(genre);
            }
            if (genre.textContent === "Programming") {
                getPopularBooks(`${genre.textContent}`);
            } else if (genre.textContent === "Business") {
                getPopularBooks(`${genre.textContent}`);
            } else if (genre.textContent === "Science") {
                getPopularBooks(`${genre.textContent}`);
            } else if (genre.textContent === "Fiction") {
                getPopularBooks(`${genre.textContent}`);
            } else if (genre.textContent === "Philosophy") {
                getPopularBooks(`${genre.textContent}`);
            } else if (genre.textContent === "Biography") {
                getPopularBooks(`${genre.textContent}`);
            }
        });
    });
    myLibrary.addEventListener("click", () => {
        if (localStorage.getItem("library")) {
            let data = JSON.parse(localStorage.getItem("library"));
            sessionStorage.setItem("genre", "My library");
            sessionStorage.setItem("search_data", JSON.stringify(data));
            drawBooks(data);
        } else {
            let { container } = state;
            container.innerHTML = `<h1 class="library-text">You don't have any books in your library.</h1>`;
        }
    });
};
export {
    getBooksByGenres,
    getPopularBooks,
    setElementStyles
};
