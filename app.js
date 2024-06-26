const inputEL = document.getElementById("input-el");
const saveTabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("del-btn");
const itemEl = document.getElementById("list-el");
const itemsFromLocalStorage = JSON.parse(localStorage.getItem("myItem"));
const themebtn = document.getElementById("modes");

const themePreference = localStorage.getItem("theme_pref")
const delItem = document.querySelector("a")

let myItems = [];

if (itemsFromLocalStorage) {
  myItems = itemsFromLocalStorage;
  render(myItems);
}


if(themePreference) {
  document.body.classList.add("dark-mode")
}
/*---------------------------- */
inputEL.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    myItems.push(inputEL.value);
    localStorage.setItem("myItem", JSON.stringify(myItems));
    inputEL.value = "";
    render(myItems);
  }
});

function render(arr) {
  let listItems = "";

  for (let i = 0; i < arr.length; i++) {
    listItems += `
        <li> 
            <a target='_blank' href='${arr[i]}'>
            ${arr[i]}
            </a>
            <button class="item-del-btn" data-index='${i}'>❌</button>
        </li>
        `;
  }
  itemEl.innerHTML = listItems;
}

saveTabBtn.addEventListener("click", () => {
  (window.browser || window.chrome).tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      myItems.push(tabs[0].url);
      localStorage.setItem("myItem", JSON.stringify(myItems));
      
      render(myItems);
    }
    );
  });
  
  delBtn.addEventListener("click", () => {
    myItems = [];
    localStorage.clear();
    render(myItems);
  });
  
  // delBtn.addEventListener("click", () => {
    //   myItems.pop();
    //   render(myItems);
    // });
itemEl.addEventListener('click',function(event) {
  if(event.target.classList.contains("item-del-btn")){
    const index = parseInt(event.target.dataset.index)
    deleteItem(index)
  }
})

function deleteItem(index){
  myItems.splice(index,1)
  localStorage.setItem("myItem", JSON.stringify(myItems));
  render(myItems)
}

themebtn.addEventListener("click",changeTheme)
function changeTheme() {
  let body = document.body;
  body.classList.toggle("dark-mode");

  if(body.classList.contains("dark-mode")){
    localStorage.setItem("theme_pref","dark")
  }
  else{
    localStorage.removeItem("theme_pref")
  }
}