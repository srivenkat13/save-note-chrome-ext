const inputEL = document.getElementById("input-el");
const saveTabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("del-btn");
const itemEl = document.getElementById("list-el");
const itemsFromLocalStorage = JSON.parse(localStorage.getItem("myItem"));

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

delBtn.addEventListener("dblclick", () => {
  myItems = [];
  localStorage.clear();
  render(myItems);
});

delBtn.addEventListener("click", () => {
  myItems.pop();
  render(myItems);
});
