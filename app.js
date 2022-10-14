const form = document.querySelector(".input");
const todo = document.getElementById("todo");
const container = document.querySelector(".list-container");
const text = document.querySelector(".text");
const bottom = document.querySelector(".bottom");
const clearCompleted = document.querySelector(".clear-completed");
const allAction = document.querySelectorAll(".all-action");
const activeAction = document.querySelectorAll(".active-action");
const completedAction = document.querySelectorAll(".completed-action");
const actions = document.querySelectorAll(".action");
let number = document.querySelector(".actions .test span");

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

clearCompleted.addEventListener("click", function () {
  const listItems = document.querySelectorAll(".list-item");
  const list = [...listItems];
  let active = list.filter(function (x) {
    return x.dataset.active == "true";
  });
  active.forEach(function (x) {
    container.removeChild(x);
  });
  updateNumber();
  if (container.children.length === 1) {
    container.classList.remove("show-container");
    text.classList.remove("show-container");
    bottom.classList.remove("show-container");
  }
});

allAction.forEach(function (btn) {
  btn.addEventListener("click", function () {
    actions.forEach(function (x) {
      x.classList.remove("selected");
    });
    allAction.forEach(function (x) {
      x.classList.add("selected");
    });
    const listItems = document.querySelectorAll(".list-item");
    const list = [...listItems];
    let all = list.map(function (x) {
      return x;
    });
    displayList(all);
  });
});

activeAction.forEach(function (btn) {
  btn.addEventListener("click", function () {
    actions.forEach(function (x) {
      x.classList.remove("selected");
    });
    activeAction.forEach(function (x) {
      x.classList.add("selected");
    });
  });
});

completedAction.forEach(function (btn) {
  btn.addEventListener("click", function () {
    actions.forEach(function (x) {
      x.classList.remove("selected");
    });
    completedAction.forEach(function (x) {
      x.classList.add("selected");
    });
  });
});

function displayList(arr) {
  arr.forEach(function (x) {
    container.appendChild(x);
  });
}
