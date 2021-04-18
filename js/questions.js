var url = "http://localhost:8000/questions";

function getRequest(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.addEventListener("load", function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.questions;
      resolve(data);
      console.log(data);
    });
    xhr.addEventListener("error", function () {
      reject({ status: xhr.status, url });
    });
  });
}

getRequest(url)
  .then((questions) => {
    renderAllQuestions(questions);

    var cards = document.querySelectorAll(".questions-list__card");
    var toggleTheme = document.getElementById("theme");
    var toggleFile = document.getElementById("file");
    var cardEmpty = document.querySelector(".questions-list--empty");

    toggleFile.addEventListener("change", function () {
      var chosenFile = this[this.selectedIndex].value;

      Array.prototype.forEach.call(cards, function (card, i) {
        var topic = questions[i].topic;
        var type = questions[i].type;

        if (chosenFile !== "JSON") {
          card.style.display = "none";
          cardEmpty.style.display = "inline-block";
        }
      });
    });

    toggleTheme.addEventListener("change", function () {
      var chosenTheme = this[this.selectedIndex].value;

      Array.prototype.forEach.call(cards, function (card, i) {
        var topic = questions[i].topic;

        if (toggleFile.value === "JSON" && chosenTheme === topic) {
          cardEmpty.style.display = "none";
          card.style.display = "inline-block";
        } else if (toggleFile.value === "JSON" && chosenTheme === "ALL") {
          cardEmpty.style.display = "none";
          card.style.display = "inline-block";
        } else {
          card.style.display = "none";
        }

        if (toggleFile.value !== "JSON") {
          card.style.display = "none";
          cardEmpty.style.display = "inline-block";
        }
      });
    });
  })
  .catch((err) => console.log("error", err));

function postRequest(url, data) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function () {
      if (xhr.status == 200) {
        resolve(xhr.response);
      } else {
        reject({ status: xhr.status, url });
      }
    });
    xhr.send(JSON.stringify(data));
  });
}

postRequest(url)
  .then(function (response) {
    var data = JSON.parse(response);
    createNewQuestion(data);
  })
  .catch((err) => console.log("error", err));

var listContainer = document.querySelector(".questions-list");
var modal = document.getElementById("modal");
var modalContent = document.getElementById("modal-content");
var modalOpen = document.getElementById("modal-btn");
var modalClose = document.getElementById("btn-close");
var btnCancel = document.getElementById("btn-cancel");
var btnCreate = document.getElementById("btn-submit");
var error = document.getElementById("error-text");
var form = document.forms.modalForm;

form.addEventListener("submit", onFormSubmitHandler);
listContainer.addEventListener("click", onDeleteHandler);

// работа модального окна
modalOpen.onclick = function () {
  modal.style.display = "block";
  modalContent.style.display = "block";
  btnCreate.disabled = false;
};

modalClose.onclick = function () {
  modal.style.display = "none";
};

btnCancel.onclick = function () {
  modal.style.display = "none";
  btnCreate.classList.remove("form__button--disabled");
  error.style.display = "none";
  modal.style.display = "none";
  form.reset();
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// вывод вопросов на страницу
function renderAllQuestions(questionsList) {
  var listContainer = document.querySelector(".questions-list");
  if (!questionsList) {
    console.error("Pass the list of questions!");
    return;
  }

  var fragment = document.createDocumentFragment();
  questionsList.forEach((question) => {
    var temp = listItemTemplate(question);
    fragment.appendChild(temp);
  });
  listContainer.appendChild(fragment);
}

// отрисовка шаблона со всеми вопросами
function listItemTemplate({ _id, topic, type, question, answer, iso } = {}) {
  function getListQuestions() {
    var result = [];
    var div = document.createElement("div");
    div.append(
      elemTopic,
      elemSystem,
      elemAnswer,
      elemDate,
      elemQuestion,
      deleteBtn
    );
    div.classList.add("questions-list__card-body");
    result.push(div);
    return result;
  }
  var div = document.createElement("div");
  div.classList.add("questions-list__card");
  div.setAttribute("_id", _id);

  var elemTopic = document.createElement("h2");
  elemTopic.textContent = topic;
  elemTopic.classList.add("questions-list__title", "title--h2");
  var elemSystem = document.createElement("span");
  elemSystem.textContent = type;
  elemSystem.classList.add("questions-list__type", "file-system");
  var elemAnswer = document.createElement("span");
  elemAnswer.textContent = answer;
  if (answer === true) {
    elemAnswer.classList.add("questions-list__type", "true");
  } else {
    elemAnswer.classList.add("questions-list__type", "false");
  }

  var elemDate = document.createElement("span");
  var date = new Date(iso);
  date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  elemDate.textContent = date;
  elemDate.classList.add("date");

  var elemQuestion = document.createElement("p");
  elemQuestion.textContent = question;
  elemQuestion.classList.add("questions-list__card-text");

  var deleteBtn = document.createElement("button");
  deleteBtn.classList.add("questions-list__delete-btn");

  div.append(...getListQuestions());
  return div;
}

// отправка формы из модального окна с новым вопросом
function onFormSubmitHandler(e) {
  e.preventDefault();
  var checkbox = document.querySelector(".form-checkbox");
  var select = form.elements["modal-theme"];
  var radio = form.elements.radio;
  var message = form.elements.message;

  var selectValue = select.value;
  var checkboxValue = checkbox.value;
  var radioValue = radio.value;
  var messageValue = message.value;

  btnCreate.disabled = false;

  var toggleTheme = document.getElementById("theme");

  if (!selectValue || !checkbox || !radioValue) {
    error.textContent = "Please fill in all fields!";
    btnCreate.classList.add("form__button--disabled");
    return;
  }

  if (!/^[a-z0-9_-]{1,255}$/.test(messageValue)) {
    error.textContent = "Your message must be 255 characters or less!";
    return;
  }

  var question = createNewQuestion(
    selectValue,
    checkboxValue,
    radioValue,
    messageValue
  );

  var listItem = listItemTemplate(question);
  listContainer.insertAdjacentElement("afterbegin", listItem);
  btnCreate.classList.remove("form__button--disabled");
  error.style.display = "none";
  modal.style.display = "none";
  form.reset();
}

// создание нового вопроса
function createNewQuestion(topic, type, answer, question, iso, _id) {
  var newDate = new Date();
  var newQuestion = {
    _id: `${Math.floor(Math.random())}`,
    topic,
    type,
    question,
    answer,
    iso: `${
      newDate.getMonth() + 2
    }/"${newDate.getDate()}/${newDate.getFullYear()}
      `,
  };

  postRequest(url, JSON.stringify(newQuestion));

  getRequest[newQuestion._id] = newQuestion;
  return Object.assign(newQuestion);
}

// удаление вопроса
function removeQuestion(id) {
  // listItemTemplate();

  // var modal = document.getElementById("modal-mini");
  // var modalContent = document.querySelector(".modal-content");
  // var modalOpen = document.querySelector(".questions-list__delete-btn");
  // var modalClose = document.getElementById("btnClose");
  // console.log(modalOpen);

  // modalOpen.onclick = function () {
  //   modal.style.display = "block";
  //   modal.style.zIndex = 99999;
  // };

  var isConfirm = confirm("Are you sure you want to delete this question?");
  console.log(isConfirm);
  if (!isConfirm) return isConfirm;
  delete getRequest.id;
  return isConfirm;
}

function removeQuestionsFromHtml(confirmed, el) {
  if (!confirmed) return;
  el.remove();
}

function onDeleteHandler({ target }) {
  if (target.classList.contains("questions-list__delete-btn")) {
    var parent = target.closest("[_id]");
    var id = parent.dataset.questionId;
    var confirmed = removeQuestion(id);
    removeQuestionsFromHtml(confirmed, parent);
  }
}

// переключение навигации активной страницы
document.querySelector(".nav__link").addEventListener("click", function () {
  this.classList.toggle("active");
});
