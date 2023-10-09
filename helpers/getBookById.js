export async function getBookID(id) {
    try {
        const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${id}?country=US`
        );
        const data = await res.json();
        localStorage.setItem("book", JSON.stringify(data));
        location.href = "bookViewer/bookViewer.html";
    } catch (err) {
        throw new Error(err);
    }
};