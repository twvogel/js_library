const myLibrary = [];

const area = document.querySelector(".area");

function bookInfo(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

};

function addBookToLibrary(title, author, pages, read) {

    const book = new bookInfo(title, author, pages, read);
    myLibrary.push(book);
    console.log(book);
};

function renderLibrary(){
    area.innerHTML="";
    myLibrary.forEach((book) => {    
        let card = document.createElement("div");
        card.classList.add("card");
        card.id = book.id;
        let title=document.createElement("h2");
        title.textContent= book.title;
        card.appendChild(title);
        let author=document.createElement("p");
        author.textContent= book.author;
        card.appendChild(author);
        let page=document.createElement("p");
        page.textContent=`${book.pages} pages`;
        card.appendChild(page);

        let btn_container=document.createElement("div");
        let remove_btn=document.createElement("button");
       

        remove_btn.classList.add("remove_btn");
        remove_btn.setAttribute("data-bookid",`${book.id}`);
        remove_btn.textContent="Remove";
        btn_container.appendChild(remove_btn);
        card.appendChild(btn_container);
        area.appendChild(card);
    })
};

const addBookBtn = document.getElementById("addBook");
const bookDialog = document.getElementById("dialog");
const addBookForm = document.querySelector(".submit");
const cancelBookBtn = document.querySelector(".cancel");

addBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelBookBtn.addEventListener("click", () => {
    bookDialog.close();
});


addBookForm.addEventListener("submit", (event) =>{

    event.preventDefault();
    addBookForm.reset();

    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    renderLibrary();
    bookDialog.close();
    
});



addBookToLibrary('Rich Dad Poor Dad', 'Robert Kiyosaki', 472, true);
addBookToLibrary('The Art of War', 'Sun Tzu', 87, true);
addBookToLibrary('Make Today Count', 'John C. Maxwell', 130, true);
addBookToLibrary('Think and Grow Rich', 'Napoleon Hill', 345, true);
addBookToLibrary('Way of the Wolf', 'Jordan Belfort', 248, true);

renderLibrary();
