const myLibrary = [];

const area = document.querySelector(".area");


function book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
     
    console.log(this.id);

};

book.prototype.toggleStatus = function(){
        this.read = !this.read;};


function addBookToLibrary(title, author, pages, read) {

    const newBook = new book(title, author, pages, read);
    myLibrary.push(newBook);
    
};

function renderLibrary(){
    area.innerHTML="";
    console.log(myLibrary);
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
        let status=document.createElement("p");
        if (book.read == true) {
            status.textContent= 'This book has been read.';}
        else {
            status.textContent= 'This book has not been read.';}
        card.appendChild(status);

        let btn_container=document.createElement("div");
        let remove_btn=document.createElement("button");
        let toggle_btn=document.createElement("button");
        
        btn_container.classList.add("btnContainer");
        toggle_btn.classList.add("toggle_btn");
        toggle_btn.setAttribute("data-bookid", book.id);
        toggle_btn.textContent="Toggle Read/Unread";
        remove_btn.classList.add("remove_btn");
        remove_btn.setAttribute("data-bookid", book.id);
        remove_btn.textContent="Remove";
        btn_container.appendChild(toggle_btn);
        btn_container.appendChild(remove_btn);
        card.appendChild(btn_container);
        area.appendChild(card);
    });
    const removeBookBtn = document.querySelectorAll('.remove_btn');
    const toggleBookBtn = document.querySelectorAll('.toggle_btn');

    for (const element of removeBookBtn)
       {  element.addEventListener("click",(element) => {
        const btnId = element.target.getAttribute("data-bookid");
        const c_book = myLibrary.find(book => book.id === btnId);
        let i_c_book = myLibrary.indexOf(c_book);
        console.log(i_c_book);
                myLibrary.splice(i_c_book, 1);
                renderLibrary();});};

    for (const element of toggleBookBtn)
        { element.addEventListener("click",(element) => {
        let bookIndex = element.target.getAttribute("data-bookid");
        let current_book = myLibrary.find(book => book.id === bookIndex);    
        current_book.toggleStatus();
        renderLibrary()});
        };
}    

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


addBookForm.addEventListener("click", (event) =>{

    event.preventDefault();

    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked ? true : false;
    const form = document.querySelector(".form");

    console.log(title, author, pages, read);
    addBookToLibrary(title, author, pages, read);
    
    form.reset();
    bookDialog.close();
    renderLibrary();
    
});



addBookToLibrary('Rich Dad Poor Dad', 'Robert Kiyosaki', 472, true);
addBookToLibrary('The Art of War', 'Sun Tzu', 87, true);
addBookToLibrary('Make Today Count', 'John C. Maxwell', 130, true);
addBookToLibrary('Think and Grow Rich', 'Napoleon Hill', 345, true);
addBookToLibrary('Way of the Wolf', 'Jordan Belfort', 248, false);
addBookToLibrary('The Richest Man in Babylon', 'George S. Clason', 322, true);
renderLibrary();


