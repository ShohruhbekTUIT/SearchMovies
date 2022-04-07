const elForm = document.querySelector(".site-form");
let elInput = document.querySelector(".form-input");
const elList = document.querySelector(".site-list");



elForm.addEventListener("submit",evt=>{
  evt.preventDefault();
  elList.innerHTML = "";
  let InputVal = elInput.value;

  async function getTodos(){
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=1f422e8a&s=${InputVal}`);
    const data = await response.json();
    console.log(data.Search);
    if (data.Search.length > 0) {
      
    data.Search.forEach(e => {
      const newItem = document.createElement("li");
      const itemDiv = document.createElement("div");
      const itemTitle = document.createElement("h3");
      const itemImg = document.createElement("img");
      const itemText = document.createElement("strong");
      const itemBtn = document.createElement("button");

      itemImg.setAttribute("src", e.Poster);
      itemTitle.textContent = e.Title;
      itemText.textContent = "Year: " + e.Year;
      itemBtn.textContent = "More";
      itemBtn.classList.add("more-btn");


      newItem.appendChild(itemImg);
      itemDiv.appendChild(itemTitle);
      itemDiv.appendChild(itemText);
      itemDiv.appendChild(itemBtn);
      newItem.appendChild(itemDiv);
      elList.appendChild(newItem);
    });}
  }

getTodos();
  elInput.value = "";
})

elList.addEventListener("click" , evt=>{
  let BtnChek = evt.target.matches(".more-btn")
  if (BtnChek) {
    alert("Zo'r kino");
  }
})
