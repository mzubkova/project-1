function getQuestions(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/questions");
    xhr.send();

    xhr.addEventListener("load", function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.questions;
      resolve(data);
      // resolve(JSON.parse(xhr.responseText));
    });
    xhr.addEventListener("error", function () {
      reject({ status: xhr.status, url });
    });
  });
}

getQuestions("http://localhost:8000/questions")
  .then((questions) => {
    console.log("questions", questions);
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

var listContainer = document.querySelector(".questions-list");

var form = document.forms.modalForm;
form.addEventListener("submit", onFormSubmitHandler);
listContainer.addEventListener("click", onDeleteHandler);

function renderAllQuestions(questionsList) {
  var listContainer = document.querySelector(".questions-list");
  if (!questionsList) {
    console.error("Pass the list of questions!");
    return;
  }
  console.log(questionsList);
  console.log(questionsList[0].iso);
  console.log(questionsList[0].answer);

  var fragment = document.createDocumentFragment();
  questionsList.forEach((question) => {
    var temp = listItemTemplate(question);
    fragment.appendChild(temp);
  });
  listContainer.appendChild(fragment);
}

function listItemTemplate({ _id, topic, type, question, answer, iso } = {}) {
  function getListQuestions() {
    var result = [];

    for (var i = 1; i <= 1; i++) {
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
    }
    return result;
  }
  var div = document.createElement("div");
  div.classList.add("questions-list__card");
  div.setAttribute("data-question-id", _id);
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
  date = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
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

function onFormSubmitHandler(e) {
  e.preventDefault();

  var modal = document.getElementById("modal");
  var errorBox = document.querySelector(".btn-container");
  var checkbox = document.querySelector(".form__checkbox");

  var modalCreate = document.querySelector(".form__button--create");
  console.log("checkbox", checkbox.value);

  var select = form.elements["modal-theme"];
  var radio = form.elements.radio;
  var message = form.elements.message;

  var selectValue = select.value;
  var checkboxValue = checkbox.value;
  var radioValue = radio.value;
  var messageValue = message.value;
  console.log("selectValue", selectValue);
  console.log("radioValue", radioValue);
  console.log("messageValue", messageValue);

  var error = document.createElement("p");
  error.classList.add("form__error");
  if (!selectValue || !checkbox || !radioValue) {
    errorBox.insertAdjacentElement("afterend", error);
    error.textContent = "Please fill in all fields";
    // modalCreate.disabled = true;
    modalCreate.classList.add("form__button--disabled");
    return;
  }

  if (!/^[a-z0-9_-]{1,160}$/.test(messageValue)) {
    error.textContent = "Your message must be 160 characters or less!";
    errorBox.insertAdjacentText("afterend", error);
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
  error.remove();
  form.reset();
  modal.style.display = "none";
}

function createNewQuestion(topic, type, answer, question, iso, _id) {
  var date = new Date();
  var newQuestion = {
    topic,
    type,
    answer,
    iso: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear(),
    question,
    _id: `question-${Math.random()}`,
  };

  getQuestions[newQuestion._id] = newQuestion;
  return { ...newQuestion };
}

function removeQuestion(_id) {
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
  delete getQuestions._id;
  return isConfirm;
}

function removeQuestionsFromHtml(confirmed, el) {
  if (!confirmed) return;
  el.remove();
}

function onDeleteHandler({ target }) {
  if (target.classList.contains("questions-list__delete-btn")) {
    var parent = target.closest("[data-question-id]");
    var id = parent.dataset.questionId;
    var confirmed = removeQuestion(id);
    removeQuestionsFromHtml(confirmed, parent);
  }
}
