const inputEL = document.getElementById("input-el");
const saveTabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("del-btn");
const listEl = document.getElementById("list-el");

let myItems = [];

inputEL.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    myItems.push(inputEL.value);
    inputEL.value = "";
    renderItem(myItems);
  }
});

function renderItem(arr) {
  let listItems = "";
  for (let i = 0; i < arr.length; i++) {
    listItems += `
    <li> ${arr[i]}</li>
    `;
  }
  listEl.innerHTML = listItems;
}
