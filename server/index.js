// const myHttp = http();

function getQuestions(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/questions.json");
    xhr.send();

    xhr.addEventListener("load", function () {
      resolve(JSON.parse(xhr.responseText));
    });
    xhr.addEventListener("error", function () {
      reject({ status: xhr.status, url });
    });
  });
}

getQuestions("http://localhost:8000/questions.json")
  .then((questions) => {
    console.log(questions);
  })
  .catch((err) => console.log("error", err));

var listContainer = document.querySelector(".questions-list");

renderAllQuestions(getQuestions);
// form.addEventListener("submit", onFormSubmitHandler);
listContainer.addEventListener("click", onDeleteHandler);

function renderAllQuestions(questionsList) {
  if (!questionsList) {
    console.error("Pass the list of questions!");
    return;
  }

  var fragment = document.createDocumentFragment();
  Object.values(questionsList).forEach((question) => {
    var tr = listItemTemplate(question);
    fragment.appendChild(tr);
  });
  listContainer.appendChild(fragment);
}

function listItemTemplate({ _id, topic, question, answer, startDate } = {}) {
  function getListQuestions() {
    var result = [];

    for (var i = 1; i <= 1; i++) {
      var div = document.createElement("div");
      div.append(
        elemTopic,
        elemSystem,
        elemQuestion,
        elemAnswer,
        elemDate,
        deleteBtn
      );
      div.classList.add("questions-list__card-body");
      result.push(div);
    }
    return result;
  }

  var div = document.createElement("div");
  div.classList.add("questions-list__card", "d-flex");
  div.setAttribute("data-question-id", _id);

  var elemTopic = document.createElement("h2");
  elemTopic.textContent = topic;
  elemTopic.classList.add("questions-list__title", "title--h2");

  var elemSystem = document.createElement("span");
  elemSystem.textContent = topic;
  elemSystem.classList.add("questions-list__type", "file-system");

  var elemAnswer = document.createElement("span");
  elemAnswer.textContent = answer;
  elemAnswer.classList.add("questions-list__type", "true-false");

  var elemDate = document.createElement("span");
  elemDate.textContent = startDate;
  elemDate.classList.add("date");

  var elemQuestion = document.createElement("p");
  elemQuestion.textContent = question;
  elemQuestion.classList.add("questions-list__card-text");

  // var deleteBtnBox = document.createElement("div");
  // deleteBtnBox.classList.add("questions-list__delete", "d-flex");

  var deleteBtn = document.createElement("button");
  deleteBtn.classList.add("questions-list__delete-btn");

  div.append(...getListQuestions());
  return div;
}

// function onFormSubmitHandler(e) {
//   e.preventDefault();
//   var numberValue = inputNumber.value;
//   var dateCreateValue = inputCreate.value;
//   var dateSupplyValue = inputSupply.value;
//   var commentValue = inputComment.value;

//   if (!numberValue || !dateCreateValue || !dateSupplyValue || !commentValue) {
//     alert("Please enter a number, date and comment");
//     return;
//   }

//   if (!/^[0-9]{3,}$/.test(numberValue)) {
//     alert(
//       "Please only enter numeric characters!(0-9) text field that should have at least 3 symbols"
//     );
//     return;
//   }

//   if (!/^[0-9_-]{3,}$/.test(dateCreateValue && dateSupplyValue)) {
//     alert("Please only enter numeric characters!(0-9)");
//     return;
//   }

//   if (!/^[a-z0-9_-]{1,160}$/.test(commentValue)) {
//     alert("Your comment must be 160 characters or less!");
//     return;
//   }

//   var question = createNewInvoice(
//     numberValue,
//     dateCreateValue,
//     dateSupplyValue,
//     commentValue
//   );
//   var listItem = listItemTemplate(question);
//   listContainer.insertAdjacentElement("afterbegin", listItem);
//   form.reset();
// }

// function createNewQuestion(_id, topic, question, answer, startDate) {
//   var newInvoice = {
//     topic,
//     question,
//     answer,
//     startDate,
//     _id: `invoice-${Math.random()}`,
//   };

//   getQuestions[newInvoice._id] = newInvoice;

//   return { ...newInvoice };
// }

function removeQuestion(id) {
  var isConfirm = confirm("You want to delete question?");
  if (!isConfirm) return isConfirm;
  delete getQuestions.id;
  return isConfirm;
}

function removeQuestionsFromHtml(confirmed, el) {
  if (!confirmed) return;
  el.remove();
}

function onDeleteHandler({ target }) {
  if (target.classList.contains("btn--remove")) {
    var parent = target.closest("[data-question-id]");
    var id = parent.dataset.questionId;
    var confirmed = removeQuestion(id);
    removeQuestionsFromHtml(confirmed, parent);
  }
}

getQuestions().then(renderAllQuestions);

// getQuestions("https://my-json-server.typicode.com/mzubkova/db-json/invoices")
//   .then((invoices) => {
//     console.log(invoices);
//   })
//   .catch((err) => console.log(err));

// var xhr = new XMLHttpRequest();
// xhr.open("GET", url);
// xhr.send();

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(Math.random()), 1000);
// });

// console.log(promise);

// promise.then((x) => console.log(x)).catch((err) => console.log(err));
