import { drawBookSkeletons, drawBooks } from "./helpers/drawBooks.js";
import { searchBooks } from "./helpers/searchBooks.js";
import { getBooksByGenres, getPopularBooks } from "./helpers/getBooks.js";
import { logoHandler } from "./helpers/logoHandler.js";

export const state = {
    API_KEY: `AIzaSyBZ9DMVdpO8_jh0zMLvdLeGOuGzvKwd2pE`,
    container: document.querySelector(".content"),
    input: document.querySelector("input"),
};

drawBookSkeletons();

if (!sessionStorage.getItem("search_data")) {
    getPopularBooks("programming");
} else {
    drawBooks(JSON.parse(sessionStorage.getItem("search_data")
    ));
};

function main() {
    getBooksByGenres();
    logoHandler();
    searchBooks();
}
main();