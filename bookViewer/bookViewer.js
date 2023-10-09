function getDataFromStorage() {
    const bookInfo = document.querySelector(".book-desc");
    let data = JSON.parse(localStorage.getItem("book"));
    let img = data.volumeInfo.imageLinks.small !== undefined ? data.volumeInfo.imageLinks.small : data.volumeInfo.imageLinks.thumbnail;
    document.querySelector("title").textContent = `${data.volumeInfo.title}`;
    document.querySelector(".book-image").src = `${img}`;
    document.querySelector(".book-author").textContent = `By ${data.volumeInfo.authors[0]}`;
    document.querySelector(".book-title").textContent = `${data.volumeInfo.title}`;
    document.querySelector(".description").innerHTML = data.volumeInfo.description;
    document.querySelector(".read-book-link").href = `${data.volumeInfo.previewLink}`;
    document.querySelector(".book-date").innerHTML = `${data.volumeInfo.publishedDate}`;
    document.querySelector(".book-publisher").innerHTML = `Publisher: <i>${data.volumeInfo.publisher}</i>`;
    if (data.volumeInfo.categories) {
        data.volumeInfo.categories.forEach(title => {
            const p = document.createElement("p");
            p.innerHTML = `${title}`;
            p.classList.add("book-categories");
            bookInfo.append(p);
            console.log(title);
        })
    }
    function addToBookShelf() {
        const addButton = document.querySelector(".book-reading-mode").querySelector("img");
        addButton.addEventListener("click", () => {
            console.log(data);
            if (!localStorage.getItem("library")) {
                localStorage.setItem("library", JSON.stringify([data]));
                location.reload();
            } else {
                let libary = JSON.parse(localStorage.getItem("library"));
                if (!JSON.stringify(libary).includes(JSON.stringify(data))) {
                    console.log(JSON.stringify(libary).includes(JSON.stringify(data)));
                    libary.push(data);
                    localStorage.setItem("library", JSON.stringify(libary));
                    location.reload();
                }
            }
        })
    }
    addToBookShelf();
};
function backToPage() {
    document.querySelector(".arrow-left").addEventListener("click", () => {
        location.href = '../index.html';
    });
};
function drawLibrary() {
    const myLibrary = document.querySelector(".library");
    const myLibraryDiv = document.querySelector(".my-library");
    if (localStorage.getItem("library")) {
        const library = JSON.parse(localStorage.getItem("library"));
        library.forEach(book => {
            const bookCover = document.createElement("img");
            const link = document.createElement("a");
            bookCover.classList.add("library-book-img");
            bookCover.src = `${book.volumeInfo.imageLinks.thumbnail}`;
            link.href = `${book.volumeInfo.previewLink}`;
            link.target = "_blank";
            link.append(bookCover);
            myLibrary.append(link);
        })
    } else {
        myLibraryDiv.style.display = "none";
    }
}
drawLibrary();
backToPage();
getDataFromStorage();