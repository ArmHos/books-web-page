import { state } from "../main.js";
import { drawBookSkeletons, drawBooks } from "./drawBooks.js";

function searchBooks() {
    let { API_KEY, input, container } = state;
    if (localStorage.getItem("data")) {
        drawBooks(JSON.parse(localStorage.getItem("data")));
    }
    input.addEventListener("keydown", async (e) => {
        if (e.code === "Enter") {
            sessionStorage.clear("genre");
            drawBookSkeletons();
            let search_query = input.value.trim();
            if (search_query) {
                try {
                    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search_query}&maxResults=8&key=${API_KEY}`);
                    const data = await res.json();
                    sessionStorage.setItem("search_data", JSON.stringify(filterData(data)));
                    drawBooks(filterData(data));
                    input.value = "";
                    console.log(data);
                } catch (err) {
                    container.innerHTML = "";
                    drawBookSkeletons();
                    setTimeout(() => {
                        container.innerHTML = `Something is gone wrong please try again.`;
                    }, 3000);
                    throw new Error(err);
                }
            } else {
                container.innerHTML = `Please fill the Input`;
            };
        }
    });
};

function filterData(data) {
    let filteredData = data.items.filter(item => {
        return item.volumeInfo.imageLinks !== undefined && item.volumeInfo.authors !== undefined && item.volumeInfo.description !== undefined;
    });
    return filteredData;
};

export {
    searchBooks,
    filterData
}