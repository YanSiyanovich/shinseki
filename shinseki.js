const questions = [
  { question: "Do you have an older sister?", role: "Older Sister", jpRole: "姉" },
  { question: "Do you have a younger sister?", role: "Younger Sister", jpRole: "妹" },
  { question: "Do you have an older brother?", role: "Older Brother", jpRole: "兄" },
  { question: "Do you have a younger brother?", role: "Younger Brother", jpRole: "弟" },
  { question: "Do you have a father?", role: "Father", jpRole: "父" },
  { question: "Do you have a mother?", role: "Mother", jpRole: "母" },
  {
    question: "Do you have an uncle on your mother's side?",
    role: "Uncle (Mother's Side)",
    parentRole: "mother",
    jpRoleOlder: "伯父",
    jpRoleYounger: "叔父"
  },
  {
    question: "Do you have an aunt on your mother's side?",
    role: "Aunt (Mother's Side)",
    parentRole: "mother",
    jpRoleOlder: "伯母",
    jpRoleYounger: "叔母"
  },
  {
    question: "Do you have an uncle on your father's side?",
    role: "Uncle (Father's Side)",
    parentRole: "father",
    jpRoleOlder: "伯父",
    jpRoleYounger: "叔父"
  },
  {
    question: "Do you have an aunt on your father's side?",
    role: "Aunt (Father's Side)",
    parentRole: "father",
    jpRoleOlder: "伯母",
    jpRoleYounger: "叔母"
  },
  { question: "Do you have a cousin on your mother's side?", role: "Cousin (Mother's Side)", jpRole: "いとこ" },
  { question: "Do you have a cousin on your father's side?", role: "Cousin (Father's Side)", jpRole: "いとこ" },
  { question: "Do you have a grandmother on your mother's side?", role: "Grandmother (Mother's Side)", jpRole: "祖母" },
  { question: "Do you have a grandfather on your mother's side?", role: "Grandfather (Mother's Side)", jpRole: "祖父" },
  { question: "Do you have a grandmother on your father's side?", role: "Grandmother (Father's Side)", jpRole: "祖母" },
  { question: "Do you have a grandfather on your father's side?", role: "Grandfather (Father's Side)", jpRole: "祖父" }
];

const questionText = document.getElementById("question-text");
const choiceContainer = document.getElementById("choice-container");
const textInputContainer = document.getElementById("text-input-container");
const userInput = document.getElementById("user-input");
let currentQuestionIndex = 0;
let stage = "yesno";

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.question;
  stage = "yesno";
  choiceContainer.hidden = false;
  textInputContainer.hidden = true;
}

function handleYesNo(answer) {
  const question = questions[currentQuestionIndex];

  if (answer !== "yes") {
    moveToNextQuestion();
    return;
  }

  if (question.jpRoleOlder) {
    stage = "age";
    questionText.textContent = `Is this ${question.role.toLowerCase()} older or younger than your ${question.parentRole}?`;
    choiceContainer.hidden = true;
    textInputContainer.hidden = false;
    userInput.placeholder = 'Enter "older" or "younger"...';
    userInput.value = "";
    userInput.focus();
    return;
  }

  promptForName(question.jpRole);
}

function submitTextAnswer() {
  const answer = userInput.value.trim();
  if (!answer) {
    return;
  }

  const question = questions[currentQuestionIndex];

  if (stage === "age") {
    const ageAnswer = answer.toLowerCase();
    if (!ageAnswer.includes("older") && !ageAnswer.includes("younger")) {
      userInput.setCustomValidity('Please enter "older" or "younger".');
      userInput.reportValidity();
      return;
    }

    userInput.setCustomValidity("");
    const jpRole = ageAnswer.includes("older") ? question.jpRoleOlder : question.jpRoleYounger;
    promptForName(jpRole);
  } else {
    moveToNextQuestion();
  }
}

function promptForName(jpRole) {
  stage = "name";
  questionText.innerHTML = `What is their name? Write the answer in Japanese.<br><small>私の．．．の名前は...です。</small>`;
  choiceContainer.hidden = true;
  textInputContainer.hidden = false;
  userInput.placeholder = "Enter the Japanese answer...";
  userInput.value = "";
  userInput.focus();
}

function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    return;
  }

  questionText.textContent = "Quiz complete!";
  choiceContainer.hidden = true;
  textInputContainer.hidden = true;
}

document.getElementById("yes-button").addEventListener("click", () => handleYesNo("yes"));
document.getElementById("no-button").addEventListener("click", () => handleYesNo("no"));
document.getElementById("submit-button").addEventListener("click", submitTextAnswer);
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitTextAnswer();
  }
});

showQuestion();
