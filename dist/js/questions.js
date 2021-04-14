function getQuestions(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/questions");
    xhr.send();

    xhr.addEventListener("load", function () {
      resolve(JSON.parse(xhr.responseText));
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
    var cardEmpty = document.querySelector(".questions-list--empty");

    toggleTheme.addEventListener("change", function () {
      var chosenTheme = this[this.selectedIndex].value;
      var chosenFile = this[this.selectedIndex].value;

      Array.prototype.forEach.call(cards, function (card, i) {
        var topic = questions[i].topic;
        var type = questions[i].type;
        if (chosenTheme === topic && chosenFile === type) {
          card.style.display = "inline-block";
        } else {
          cardEmpty.style.display = "inline-block";
          card.style.display = "none";
          setTimeout(function () {
            location.reload();
          }, 3000);
        }
      });
    });
  })
  .catch((err) => console.log("error", err));

// var form = document.forms.addInvoice;
// const inputNumber = form.elements.number;
// const inputCreate = form.elements["date-created"];
// const inputSupply = form.elements["date-supplied"];
// const inputComment = form.elements.comment;

// listContainer.addEventListener("click", onDeleteHandler);
// var select = document.querySelector(".questions-box__option");
// console.log(select.value);
// var option = document.querySelector(".questions-box__option");
// console.log(select.value);

// form.addEventListener("submit", onFormSubmitHandler);

function renderAllQuestions(questionsList) {
  var listContainer = document.querySelector(".questions-list");
  if (!questionsList) {
    console.error("Pass the list of questions!");
    return;
  }
  console.log(questionsList);
  // console.log(questionsList[0].iso);
  // console.log(questionsList[0].answer);

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
  elemDate.textContent = iso;
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

// function removeQuestion(id) {
//   var isConfirm = confirm("You want to delete question?");
//   if (!isConfirm) return isConfirm;
//   delete getQuestions.id;
//   return isConfirm;
// }

// function removeQuestionsFromHtml(confirmed, el) {
//   if (!confirmed) return;
//   el.remove();
// }

// function onDeleteHandler({ target }) {
//   if (target.classList.contains("btn--remove")) {
//     var parent = target.closest("[data-question-id]");
//     var id = parent.dataset.questionId;
//     var confirmed = removeQuestion(id);
//     removeQuestionsFromHtml(confirmed, parent);
//   }
// }
