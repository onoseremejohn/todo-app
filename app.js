const form = document.querySelector(".input");
const todo = document.getElementById("todo");
const container = document.querySelector(".list-container");
const text = document.querySelector(".text");
const bottom = document.querySelector(".bottom");
let number = document.querySelector(".actions .test span");
// let activeState = false;

// checkBoxes.forEach(function (checkBox) {
//   checkBox.addEventListener("click", function (e) {
//     const element = e.currentTarget.parentElement.parentElement;
//     element.classList.toggle("checked");
//   });
// });

form.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();
  const value = todo.value;
  const id = new Date().getTime().toString();
  if (value) {
    const element = document.createElement("li");
    const last = container.lastElementChild;
    element.classList.add("list-item");
    const attr = document.createAttribute("data-id");
    const active = document.createAttribute("data-active");
    attr.value = id;
    active.value = false;
    element.setAttributeNode(attr);
    element.setAttributeNode(active);
    element.innerHTML = `<div class="flex">
            <span class="check-box">
              <i class="fa-solid fa-check"></i>
            </span>
            <p>${value}</p>
            <button class="delete">
              <span class="x-icon"></span>
            </button>
          </div>`;
    const deleteBtn = element.querySelector(".delete");
    const checkBox = element.querySelector(".check-box");
    deleteBtn.addEventListener("click", deleteItem);
    checkBox.addEventListener("click", checkItem);
    container.insertBefore(element, last);
    container.classList.add("show-container");
    text.classList.add("show-container");
    bottom.classList.add("show-container");
    todo.value = "";
    updateNumber();
  } else {
    console.log("empty");
  }
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  container.removeChild(element);
  updateNumber();
  if (container.children.length === 1) {
    container.classList.remove("show-container");
    text.classList.remove("show-container");
    bottom.classList.remove("show-container");
  }
}

function checkItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  element.classList.toggle("checked");
  let active = activeState(element);
  if (active) {
    element.dataset.active = "true";
  } else {
    element.dataset.active = "false";
  }
  updateNumber();
}

function activeState(e) {
  if (e.classList.contains("checked")) {
    return true;
  } else {
    return false;
  }
}

function updateNumber() {
  const listItems = document.querySelectorAll(".list-item");
  const list = [...listItems];
  let counter = 0;
  let val = list.map(function (x) {
    if (x.dataset.active == "false") {
      counter++;
    }
  });
  number.textContent = counter;
}
