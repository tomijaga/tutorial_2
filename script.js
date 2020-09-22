let items = [];
let storage = window.localStorage.getItem("items");

if (typeof storage !== "undefined") {
  items = JSON.parse(storage);
}

const updateLocalStorage = () => {
  console.log("should be stored");
  window.localStorage.setItem("items", JSON.stringify(items));
};

const deleteAllDisplayedItems = () => {
  document.querySelectorAll("li").forEach((att) => {
    att.remove();
  });
};

const createListItem = (element) => {
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.checked = element.isChecked;
  input.setAttribute("id", element.id);

  const div1 = document.createElement("div");
  div1.appendChild(input);

  const div2 = document.createElement("div");
  div2.innerHTML = element.name;

  const div3 = document.createElement("div");
  div3.style.borderColor = element.borderColor;
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
  deleteAllDisplayedItems();
  printAllItems();
};

const addItemToArray = (name) => {
  items.push({
    name: name,
    isChecked: false,
    isHighlighted: false,
    id: items.length,
    borderColor: "black"
  });
};

const addAndDisplay = (event) => {

  if (event.keyCode === 13 || event.type === "click") {
    const inputText = document.querySelector(".input-text");
    const text = inputText.value;

    console.log(text);

    if (text !== "") {
      addItemToArray(text);
      inputText.value = "";
      displayItems();
    }
  }
};

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", addAndDisplay);

const textBox = document.querySelector(".input-text");
textBox.addEventListener("keyup", addAndDisplay);


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
    obj.id = i++;
    console.log(obj);
    return obj;
  });
};

const removeSelectedItems = () => {
  let ids = getSelectedItems();
  items = items.filter((obj) => {
    let x = obj.id;
    if (ids.includes(x.toString())) {
      console.log("deleted");
      return false;
    }
    return true;
  });

  resetOrder();
  displayItems();
};

const removeButton = document.querySelector(".remove-items");
removeButton.addEventListener("click", removeSelectedItems);

const defaultBorderColor = () => {

  if (confirm("This will change all the list items to the default colour!")) {
    items = items.map(item => {
      item.borderColor = "black";
      return item;
    })

    displayItems();
  }

}

const getColourInput = () => {
  let c = document.querySelector(".highlight");
  return `${c.value}`
}

const highlightSelectedItems = () => {
  let selectedItems = getSelectedItems();
  let colour = getColourInput();
  // console.log(selectedItems);
  // console.log(colour);

  items = items.map(item => {
    if (selectedItems.includes(item.id.toString())) {
      item.borderColor = colour;
    }
    return item;
  });
  // console.log(items);

  displayItems();
}

const toggleHighlightButton = document.querySelector(".toggle-highlight");
toggleHighlightButton.addEventListener("dblclick", defaultBorderColor)
toggleHighlightButton.addEventListener("click", highlightSelectedItems);

const highlightColourInput = document.querySelector(".highlight");
highlightColourInput.addEventListener("change", highlightSelectedItems);

const sortByColour = () => {
  items = items.sort((itemA, itemB) => {
    if (itemA.borderColor > itemB.borderColor) {
      return -1;
    } else if (itemA.borderColor < itemB.borderColor) {
      return 1;
    }
    return 0;
  })

  displayItems();
}

const sortByColourButton = document.querySelector(".sort-by-colour");
sortByColourButton.onclick = sortByColour;

window.onload = displayItems;

window.onbeforeunload = updateLocalStorage;
