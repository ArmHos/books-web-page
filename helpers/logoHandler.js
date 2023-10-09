import { getPopularBooks } from "./getBooks.js";
export function logoHandler() {
    const logo = document.querySelector(".main-menu-logo");
    logo.addEventListener("click", async () => {
        getPopularBooks("programming");
        sessionStorage.setItem("genre", "Programming");
    });
};