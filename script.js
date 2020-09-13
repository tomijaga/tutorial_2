let x = localStorage["item"];
let items = [];

if (typeof x === undefined) {
  console.log(x);
  items = JSON.parse(localStorage["item"]);
}

const updateLocalStorage = () => {
  localStorage["item"] = JSON.stringify(items);
};

const deleteAllItems = () => {
  document.querySelectorAll("li").forEach((att) => {
    att.remove();
  });
};

const createListItem = (element) => {
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.checked = element.isChecked;
  input.setAttribute("id", element.order);

  const div1 = document.createElement("div");
  div1.appendChild(input);

  const div2 = document.createElement("div");
  div2.innerHTML = element.name;

  const div3 = document.createElement("div");
  div3.classList.add("item");

  div3.appendChild(div2);
  div3.appendChild(div1);

  const li = document.createElement("li");
  li.appendChild(div3);

  const ol = document.querySelector("ol");
  ol.appendChild(li);
};

const printAllItems = () => {
  items.forEach((obj) => {
    createListItem(obj);
  });
};

const displayItems = () => {
  deleteAllItems();
  printAllItems();
  updateLocalStorage();
};

const addItemToArray = (name) => {
  items.push({
    name: name,
    isChecked: false,
    isHighlighted: false,
    order: items.length,
  });
};

const addAndDisplay = () => {
  const inputText = document.querySelector(".input-text");
  const text = inputText.value;

  console.log(text);

  if (text !== "") {
    addItemToArray(text);
    inputText.value = "";
    displayItems();
  }
};

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", addAndDisplay);

//Sort handler
const sortAlphabetically = () => {
  items.sort((obj1, obj2) => obj1.name.localeCompare(obj2.name));

  displayItems();
};

const sortButton = document.querySelector(".sort-items");
sortButton.addEventListener("click", sortAlphabetically);

// Remove Handler
const getSelectedItems = () => {
  let id = [];
  let check = document.querySelectorAll("input");

  check = check.forEach((input) => {
    if (input.getAttribute("type") === "checkbox") {
      if (input.checked === true) {
        id.push(input.getAttribute("id"));
      }
    }
  });
  return id;
};

const resetOrder = () => {
  let i = 0;
  items = items.map((obj) => {
    obj.order = i++;
    console.log(obj);
    return obj;
  });
};

const removeSelectedItems = () => {
  let id = getSelectedItems();
  items = items.filter((obj) => {
    let x = obj.order;
    if (id.includes(x.toString())) {
      console.log("deleted");
      return false;
    }
    return true;
  });

  displayItems();
  resetOrder();
  updateLocalStorage();
};

const removeButton = document.querySelector(".remove-items");
removeButton.addEventListener("click", removeSelectedItems);

window.onload = displayItems();
