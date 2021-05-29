// Selectors
const itemInput = document.querySelector("#item");
const quantityInput = document.querySelector("#quantitiy");
const descriptionInput = document.querySelector("#description");
const submitButton = document.querySelector("#submit-button");
const formInput = document.querySelector("#my-form");
const itemList = document.querySelector(".input-list");

// Item Array
let items = [
  {
    name: "Network is trash",
    quantity: 1,
    description: `MTN is just trash today`,
  },
  {
    name: "Sex starved",
    quantity: 30,
    description: "Need to fornicate",
  },
];
// Event Listeners

// This event is fired when the user clicks the submit button the form
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkFormValue();
  addItemsToArray();
  clearFormFields();
});

// This event is fired when the DOM has been parsed has been parsed
window.addEventListener("DOMContentLoaded", (e) => {
  loadNodeFromArray();
  addEvents();
});

// Functions

// Checks if the form is valid
function checkFormValue() {
  let errorMessage = "";
  const childrenNode = [...formInput.children];
  childrenNode.pop();
  childrenNode.forEach((child) => {
    if (!child.value) {
      errorMessage += `${child.placeholder} is not valid. \n`;
    }
  });

  if (!errorMessage) {
    return;
  }
  alert(errorMessage);
  throw new Error("Form not valid");
}

// Add form data to the array
function addItemsToArray() {
  const newItem = {
    name: itemInput.value,
    quantity: quantityInput.value,
    description: descriptionInput.value,
  };
  items.push(newItem);
  addNewNodeToList(newItem);
}

// This function clears the form field
function clearFormFields() {
  itemInput.value = "";
  quantityInput.value = "";
  descriptionInput.value = "";
}

// Displays the data parsed to it on the page
function addNewNodeToList(object) {
  const listItem = document.createElement("li");
  const nameParagraph = document.createElement("p");
  nameParagraph.className = "item-list";
  nameParagraph.innerText = object.name;
  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.className = "item-description";
  descriptionParagraph.innerText = object.description;
  const quantityParagraph = document.createElement("p");
  quantityParagraph.innerHTML = `<strong>${object.quantity}</strong>`;
  const buttonElement = document.createElement("button");
  buttonElement.className = "done-button";
  buttonElement.type = "button";
  buttonElement.innerText = "Done";
  listItem.appendChild(nameParagraph);
  listItem.appendChild(descriptionParagraph);
  listItem.appendChild(quantityParagraph);
  listItem.appendChild(buttonElement);
  itemList.appendChild(listItem);
  addEvents();
}

// Loads data from the array and displays it on the array
function loadNodeFromArray() {
  items.forEach((item) => {
    addNewNodeToList(item);
  });
}

// This function removes and item from the page and from the array
function removeItemFromNodeAndArray(target) {
  const itemName = target.parentNode.firstChild.innerText;
  const itemToRemove = target.parentNode;
  itemToRemove.remove();
  items = items.filter((obj) => obj.name !== itemName);
}

// This function adds the remove event
function addEvents() {
  //   This event is fired when the user remove an item from the list
  [...document.querySelectorAll(".done-button")].forEach((element) => {
    element.addEventListener("click", (e) => {
      removeItemFromNodeAndArray(e.target);
    });
  });
}
