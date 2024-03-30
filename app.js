const inputEL = document.getElementById("input-el");
const saveTabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("del-btn");
const itemEl = document.getElementById("list-el");
const itemsFromLocalStorage = JSON.parse(localStorage.getItem("myItem"));
const themebtn = document.getElementById("modes");


const delItem = document.querySelector("a")

let myItems = [];

if (itemsFromLocalStorage) {
  myItems = itemsFromLocalStorage;
  render(myItems);
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
            <button onclick='deleteItem(${i})' id="item-del-btn">❌</button>
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

function deleteItem(index){
  myItems.splice(index,1)
  localStorage.setItem("myItem", JSON.stringify(myItems));
  render(myItems)
}
function mode() {
  let body = document.body;
  body.classList.toggle("dark-mode");
}