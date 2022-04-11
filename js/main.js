const elForm = document.querySelector(".site-form");
let elInput = document.querySelector(".form-input");
const elList = document.querySelector(".site-list");

const elBtnPrev = document.querySelector(".prev-btn");
const elBtnNext = document.querySelector(".next-btn");

const Key = "1f422e8a";

let activePage = 1;

elForm.addEventListener("submit",evt=>{
  evt.preventDefault();
  elList.innerHTML = "";
  let InputVal = elInput.value;

  async function getTodos(){
    elList.innerHTML = "";
    const response = await fetch(`http://www.omdbapi.com/?apikey=${Key}&s=${InputVal}&page=${activePage}`);
    // http://www.omdbapi.com/?apikey=[1f422e8a]&
    // http://www.omdbapi.com/?i=tt3896198&apikey=1f422e8a&
    const data = await response.json();
    console.log(data);
    if (data.Response && data.Search.length) {
      
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

    if (activePage == 1) {
      elBtnPrev.setAttribute("disabled" , true)
    }else{
      elBtnPrev.removeAttribute("disabled")
    }

    const totalPage = Math.ceil(data.totalResults / 10);

    if (activePage == totalPage) {
      elBtnNext.setAttribute("disabled" , true)
    }else{
      elBtnNext.removeAttribute("disabled")
    }
  }

getTodos();
  elInput.value = "";


elList.addEventListener("click" , evt=>{
  let BtnChek = evt.target.matches(".more-btn")
  if (BtnChek) {
    alert("Zo'r kino");
  }
})


elBtnPrev.addEventListener("click" , function(){
  activePage--
  getTodos()
})
elBtnNext.addEventListener("click" , function(){
  activePage++
  console.log(activePage);
  getTodos()
})

})