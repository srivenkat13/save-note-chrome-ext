const inputEL = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const saveTabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("del-btn");
const itemEl = document.getElementById("list-el");
const linkEl = document.getElementById("list2-el");

let myItems = [];
let myLinks = [];

let isItem = true;

/*---------------------------- */
inputEL.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    isItem = true;
    myItems.push(inputEL.value);
    inputEL.value = "";
    render(myItems);
  }
});
saveBtn.addEventListener("click", () => {
  myItems.push(inputEL.value);
  inputEL.value = "";
  render(myItems);
});

function render(arr) {
  let listItems = "";
  let linkItems = "";

  for (let i = 0; i < arr.length; i++) {
    if (flag) {
      listItems += `
        <li> ${arr[i]}</li>
        `;
      itemEl.innerHTML = listItems;
    } else {
      linkItems += `
        <li> 
            <a target="_blank" href="${arr[i]}">
            ${arr[i]}
            </a>
        </li>
        `;
      linkEl.innerHTML = linkItems;
    }
  }
}

saveTabBtn.addEventListener("click", () => {
  isItem = false;
  myLinks.push(inputEL.value);
  renderItem(myLinks, isItem);
});
