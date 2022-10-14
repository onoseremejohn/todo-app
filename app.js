const form = document.querySelector(".input");
const todo = document.getElementById("todo");
const container = document.querySelector(".list-container");
const lastItem = document.querySelector(".last-item");
const text = document.querySelector(".text");
const bottom = document.querySelector(".bottom");
const clearCompleted = document.querySelector(".clear-completed");
const allAction = document.querySelectorAll(".all-action");
const activeAction = document.querySelectorAll(".active-action");
const completedAction = document.querySelectorAll(".completed-action");
const actions = document.querySelectorAll(".action");
const themeToggler = document.querySelector(".head div");

let number = document.querySelector(".actions .test span");

window.addEventListener("DOMContentLoaded", setupItems);

form.addEventListener("submit", addItem);

themeToggler.addEventListener("click", function () {
  let element = document.body;
  element.classList.toggle("light-mode");
  let theme = getThemeStorage();
  if (element.classList.contains("light-mode")) {
    theme.theme = "light-mode";
  } else {
    theme.theme = "dark-mode";
  }
  localStorage.setItem("todoTheme", JSON.stringify(theme));
});

function addItem(e) {
  e.preventDefault();
  const value = todo.value;
  const id = new Date().getTime().toString();
  if (value) {
    createListItem(id, value, "false");
    container.classList.add("show-container");
    text.classList.add("show-container");
    bottom.classList.add("show-container");
    todo.value = "";
    updateNumber();
    addToLocalStorage(id, value, "false");
  }
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  container.removeChild(element);
  updateNumber();
  deleteFromLocalStorage(id);
  if (container.children.length === 1) {
    container.classList.remove("show-container");
    text.classList.remove("show-container");
    bottom.classList.remove("show-container");
  }
}

function checkItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  element.classList.toggle("checked");
  let active = activeState(element);
  if (active) {
    element.dataset.active = "true";
  } else {
    element.dataset.active = "false";
  }
  updateNumber();
  editLocalStorage(id, element);
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
    let id = x.dataset.id;
    deleteFromLocalStorage(id);
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
    listItems.forEach(function (x) {
      x.style.display = "list-item";
    });
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
    filterList("true");
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
    filterList("false");
  });
});

function filterList(value) {
  const listItems = document.querySelectorAll(".list-item");
  const list = [...listItems];
  listItems.forEach(function (x) {
    x.style.display = "list-item";
  });
  let filter = list.map(function (x) {
    if (x.dataset.active == value) {
      x.style.display = "none";
    }
  });
}

function setupItems() {
  let items = getLocalStorage();
  let theme = getThemeStorage();
  if (theme.theme == "light-mode") {
    document.body.classList.add("light-mode");
  }
  if (items.length) {
    items.forEach(function (item) {
      createListItem(item.id, item.value, item.active);
    });
    updateNumber();
    container.classList.add("show-container");
    text.classList.add("show-container");
    bottom.classList.add("show-container");
  }
}

function addToLocalStorage(id, value, active) {
  const todoItem = { id, value, active };
  let items = getLocalStorage();
  items.push(todoItem);
  localStorage.setItem("todoList", JSON.stringify(items));
}

function deleteFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    return item.id !== id;
  });
  localStorage.setItem("todoList", JSON.stringify(items));
}

function editLocalStorage(id, element) {
  let items = getLocalStorage();
  const activeState = element.dataset.active;
  //   console.log(activeState);
  items = items.map(function (item) {
    if (item.id == id) {
      item.active = activeState;
    }
    return item;
  });
  localStorage.setItem("todoList", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("todoList")
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
}

function getThemeStorage() {
  return localStorage.getItem("todoTheme")
    ? JSON.parse(localStorage.getItem("todoTheme"))
    : {};
}

function createListItem(id, value, activeState) {
  const element = document.createElement("li");
  element.classList.add("list-item");
  const attr = document.createAttribute("data-id");
  const active = document.createAttribute("data-active");
  attr.value = id;
  active.value = activeState;
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
  if (element.dataset.active == "true") {
    element.classList.add("checked");
  } else {
    element.classList.remove("checked");
  }
  const deleteBtn = element.querySelector(".delete");
  const checkBox = element.querySelector(".check-box");
  deleteBtn.addEventListener("click", deleteItem);
  checkBox.addEventListener("click", checkItem);
  container.insertBefore(element, lastItem);
}
