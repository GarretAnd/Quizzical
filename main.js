/***************************************************LOCAL STORAGE*******************************************/
// Variables and Functions for Local Storage
let score_array = [];
let past_data;
let splinters;
let reset_btn = document.getElementById('reset');

reset_btn.addEventListener('click', clearStorage);

function gatherStorage() {
    past_data = localStorage.getItem('Data');
}

function setStorage() {
    gatherStorage();
    past_data = past_data + score_array;
    score_array = [];
    localStorage.setItem('Data', past_data);
}

function clearStorage() {
    localStorage.clear();
    past_data = [];
    score_array = [];
    splinters = [];
}

/***************************************************SCORE BOARD*******************************************/
// Variables Functions for Score Board
let leader_board = document.getElementById('leader_modal');
let list = document.getElementById('list');
let twitch = 0;

// Modal Listener for Leader Board
leader_board.onclick = function() {
  leader_board.classList.add("hidden");
  options.classList.remove('hidden');
}

function openLeaderBoard() {
    leader_board.classList.remove("hidden");  // Opens Leader Board
}

function cleanList() {
    while (list.firstChild){
        list.removeChild(list.firstChild);  // Removes all past list items
    }
}

function makeList() {  // Makes list from splinter data and sorts it
    if (splinters != null){
        splinters = sortSplinters(splinters);  // Calls Insertion Sort
        while (twitch < splinters.length - 1){
            let list_num = document.createElement('li');
            list_num.innerText = `${splinters[twitch]} Score: ${splinters[twitch+1]}`;
            list.appendChild(list_num);
            twitch = twitch + 2;
        }
        twitch = 0;
    }
}

function makeScoreBoard() {
    if (past_data != null){  // Makes sure data exists then splits up the data, pops off null cap
        splinters = past_data.split(',');
        splinters.shift();
    }
}

/***************************************************INSERTION SORT*******************************************/

// Variables for Insertion Sort
let count = 1;
let base = 1;
let place = 0;
let max = 0;
let maxIndex = 0;

function sortSplinters(splint) {  // Preforms Insertion Sort on Splinter Data
    if (splint != null){
        while (place < splint.length) {  // Credit to Jared Cole for helping me figure out that I spent an hour
            while (count < splint.length){  // Looking for a typo and that I do in fact know how to write 
                console.log("We Love Jared Cole");  // An insertion Sort Algorithim. We Appeciate him immensely.
                if (max < Number(splint[count])){  // This lab would not be possible without his dedication.
                    max = splint[count];
                    maxIndex = count;
                }
                count = count + 2;
            }
            let holder_n = splint[place];
            let holder_s = splint[place+1];
            splint[place] = splint[maxIndex-1];
            splint[place+1] = splint[maxIndex];
            splint[maxIndex-1] = holder_n;
            splint[maxIndex] = holder_s;
            place = place + 2;
            base = base + 2;
            count = base;
            max = 0;
            maxIndex = 0;
        }
        place = 0;
        base = 1;
    }
    return splint;
}

/***************************************************MAIN SCREEN*******************************************/
// Vairables and Functions for Main Screen
let options = document.getElementById('home-screen');
let poke_game = document.getElementById('PokeQ');
let cow_game = document.getElementById('CowQ');
let state_game = document.getElementById('StateG');
let big_board = document.getElementById('LBoard');
let cover_page = document.getElementById('cover_page');
let banner = document.getElementById('banner');
let quiz_box = document.getElementById('quiz-box');

poke_game.addEventListener('click', startGame);
cow_game.addEventListener('click', startGame);
state_game.addEventListener('click', startGame);
big_board.addEventListener('click', startGame);

function startGame() {  // Starts Game for whichever button is clicked
    if (this.id == 'PokeQ') { // Hides start menu, displays game menu, shuffles question array
        options.classList.add('hidden');
        quiz_box.classList.add('poke');
        banner.innerText = 'Pokemon Quiz!';
        questions_display.classList.remove('hidden'); 
        shuffled_questions = questions_p.sort(() => Math.random() -.5); // Taken from https://www.youtube.com/watch?v=riDzcEQbX6k&t=951s
        whichQ = 0; // Sets question Index to 0, score to 0, and starts questions
        scoreVal = 0;
        Value = "P";
        setQuestion("P");
    }
    else if (this.id == 'CowQ') { // hides start menu, shows game menu, shuffles question array
        options.classList.add('hidden');
        quiz_box.classList.add('cows');
        banner.innerText = 'Cow Quiz!';
        questions_display.classList.remove('hidden');
        shuffled_questions = questions_c.sort(() => Math.random() -.5);
        scoreVal = 0;
        whichQ = 0; // sets question Index to 0, and starts questions
        Value = "C";
        setQuestion("C");
    }
    else if (this.id == 'StateG') {
        options.classList.add('hidden'); // hides start menu
        scoreVal = 0;
        Value = "S";
        updateBoard(scoreVal);
        state_begin();
    }
    else { // Opens Up leader Board and inits functions
        gatherStorage();
        openLeaderBoard();
        makeScoreBoard();
        cleanList();
        makeList();
        options.classList.add('hidden'); // Hides main menu
    }
}

let questions_display = document.getElementById('game');
let question_button = document.getElementById('question');
let answer_buttons = document.getElementById('answers');
let back_img = document.getElementById('back-img');


function backHome() { // Returns to main menu
    reset();
    questions_display.classList.add("hidden");  // Hides Questions and Shows main menu
    endScreen(Value);
    options.classList.remove("hidden");
    banner.innerText = "Welcome to Quizoro!"
}

function setQuestion(V) {  // Sets Questions
    reset();
    displayQuestion(shuffled_questions[whichQ], V);  // Clears Board and Displays Question
}

/***************************************************QUESTION DISPLAY*******************************************/
// Question Variables and Functions
let shuffled_questions;
let scoreVal;
let whichQ; 
let Value;
let state_string;

function displayQuestion (Q, V) {  // Function snipped from https://github.com/WebDevSimplified/JavaScript-Quiz-App
    question_button.innerText = Q.question;
    back_img.src= Q.img;
    if (V == "P") {
        Q.answers.forEach(answer => {
            let button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct == "true") {  // Only setting it to correct if the value is correct
                button.dataset.correct = answer.correct; 
            }
            button.addEventListener('click', pickAnswerP); 
            answer_buttons.appendChild(button);
        });
    }
    else if (V == "C"){
        Q.answers.forEach(answer => {
            let button = document.createElement('button'); // Adjusted Here to add up Score this time
            button.innerText = answer.text;
            button.classList.add('btn');
            button.dataset.value = answer.value; 
            button.addEventListener('click', pickAnswerC); 
            answer_buttons.appendChild(button);
        });
    }
}

//Pick Answer Functions based on https://github.com/WebDevSimplified/JavaScript-Quiz-App
function pickAnswerP(B) {  //Question for Pokemon, has right and wrong values. 
    let selected_button = B.target;
    if (selected_button.dataset.correct == "true") {  // To keep score of number of correct answers
        scoreVal = scoreVal + 1;
    }
    let correct_answer = selected_button.dataset.correct; 
    setStatus(cover_page, correct_answer);
    Array.from(answer_buttons.children).forEach( button => {  // Colors Buttons based off right or wrong answers
        setStatus(button, button.dataset.correct)
    });
    if (shuffled_questions.length > whichQ + 1){  // Found TAs Anne Bailey and Ian Hou
        next_button.classList.remove('hidden'); // Exceptionally helpful for this logic
    }
    else {
        home_button.classList.remove('hidden');
    }
}

function pickAnswerC(B) { //Questions for Cows, no right or wrong values.
    let selected_button = B.target;
    let string = selected_button.dataset.value;
    scoreVal += parseInt(string);  // Adds the value of the question to total score
    if (shuffled_questions.length > whichQ + 1){ // Found TAs Anne Bailey and Ian Hou
        next_button.classList.remove('hidden'); // Exceptionally helpful for this logic
    }
    else {
        home_button.classList.remove('hidden');
    }
}

function setStatus(element, correct) {  // determines if a value is correct or not and colors it so
    clearStatus(element);
    if (correct == "true") { // Adds class to button, correct being green and wrong being red
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatus(E) {  // Removes class colors from elements 
    E.classList.remove('correct');
    E.classList.remove('wrong');
}

function reset() {
    next_button.classList.add('hidden');  // Hides the two options 
    home_button.classList.add('hidden');
    clearStatus(cover_page);  // Clears any effect on the background
    while (answer_buttons.firstChild){
        answer_buttons.removeChild(answer_buttons.firstChild);  // Removes all past options
    }
}

/*****************************************************CONTROLS*************************************/
// Variables for controls
let next_button = document.getElementById('next');
let home_button = document.getElementById('home');

// Next Button Listener
next_button.addEventListener('click', () => {
    whichQ++;
    setQuestion(Value);
});

// Home Listener
home_button.addEventListener('click', () => {
    backHome();
    quiz_box.classList.remove('poke');
    quiz_box.classList.remove('cows');
})

/******************************************************END SCREEN**********************************/
// Variables for Modal
var modal = document.getElementById("myModal");
var modal_img = document.getElementById('modal_img');
var modal_items = document.getElementById('modal_items');
var modal_gen = document.getElementById('general');
var result = document.getElementById('result');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Modal Listener for pop up
modal.onclick = function() {
    if (Value != "S") {  // Specific to not cowboy because we want them to be able to click and enter form
        modal.style.display = "none";
    }
}

function endScreen(v) {
    modal.style.display = "flex";
    username_wrapper.classList.add("hidden");
    if (Value == "P") {
        modal_gen.innerText = "Congratulations! You Completed The Pokemon Quiz! You Have Been Determined To Be A:";
        if (scoreVal < 5 ){
            modal_img.src = "final/begin.png";
            result.innerText = "Beginner";
        }
        else if (scoreVal < 10) {
            modal_img.src = "final/train.jpg"
            result.innerText = "Trainer";
        }
        else if (scoreVal < 15) {
            modal_img.src = "final/gym.jpg"
            result.innerText = "Gym Leader";
        }
        else {
            modal_img.src = "final/champs.jpg"
            result.innerText = "Champion";
        }
    }
    else if (Value == "C") {
        modal_gen.innerText = "Congratulations! You Completed The Cow Quiz! You Have Been Determined To Be A:";
        if (scoreVal < 25 ){
            modal_img.src = "final/dairy.jpg";
            result.innerText = "Dairy Cow";
        }
        else if (scoreVal < 35) {
            modal_img.src = "final/yak.jpg"
            result.innerText = "Yak";
        }
        else if (scoreVal < 45) {
            modal_img.src = "final/texas.jpg"
            result.innerText = "Texas Longhorn";
        }
        else if (scoreVal < 55) {
            modal_img.src = "final/ankole.jpg"
            result.innerText = "Ankole-Watusi";
        }
        else {
            modal_img.src = "final/high.jpg"
            result.innerText = "Scottish High Lander";
        }
    }
    else if (v == "S") {
        username_wrapper.classList.remove("hidden");  // Unique to this one, makes a form to submit username
        modal_gen.innerText = "Congratulations! You Completed The State Quiz! You Have Been Determined To Be A:";
        if (scoreVal < 10 ){
            modal_img.src = "final/bandit.jpg";
            result.innerText = "Bandit";
        }
        else if (scoreVal < 20) {
            modal_img.src = "final/ranch.png"
            result.innerText = "Ranch Hand";
        }
        else if (scoreVal < 30) {
            modal_img.src = "final/cowboy.jpg"
            result.innerText = "Cowboy";
        }
        else if (scoreVal < 40) {
            modal_img.src = "final/sher.jpg"
            result.innerText = "Sheriff";
        }
        else {
            modal_img.src = "final/ranger.jpg"
            result.innerText = "Ranger";
        }
    }
}

/**************************************************************COWBOY GAME***************************************/
// Variables for State Quiz
var state_div = document.getElementById("state_modal");
var form = document.forms["input"];
let user_input;
var request;
let first_time = true;
let entered_states = new Set();
let score_board = document.getElementById('score_board');
let username_wrapper = document.getElementById('wrapper');
var user = document.forms["username"];
let win = document.getElementById('winner');
let stop = false;

function state_begin() {  // Begins the state game
    stop = false;
    done = false;
    state_div.classList.remove('hidden');
    state_div.classList.add('activate');
}

user.addEventListener('submit', function(x) {  // Event Listener for username form
    x.preventDefault(); // How to get form submit was followed along with by: https://www.youtube.com/watch?v=n4B7vY9SIds
    user_input = user.querySelector('input[type="text"]').value;
    score_array.push(`,${user_input},${scoreVal}`);  // Adds data to array
    setStorage(score_array);  // Updates Local Storage with array
    user.reset();  // Resets form
    done = false;
    modal.style.display = "none";
})

form.addEventListener('submit', function(x) {
    if (first_time) {
        first_time = false; // Checks if it was the first time they entered an input to start the timer
        Time_on = true;
    } 
    x.preventDefault(); // How to get form submit was followed along with by: https://www.youtube.com/watch?v=n4B7vY9SIds
    user_input = form.querySelector('input[type="text"]').value;
    form.reset();
    user_input = user_input.toUpperCase();  // Gets value from form and cleans it
    if (states.includes(user_input) && !(entered_states.has(user_input))){  // Makes sure value is correct and new
        entered_states.add(user_input);
        user_input = user_input.toLowerCase();
        getState(user_input);  // Gets the State value from the user
    }
})

function getState(D) {  // Gets the state the user entered
    scoreVal = scoreVal + 1;  // Increases the Score by one and updates the board and checks if they won
    updateBoard(scoreVal);
    checkScore(scoreVal);
    request = document.getElementById(`${D}`); // Takes User input and gets the element for the class
    request.classList.remove("hidden");  // Makes it visable
}

function checkScore(V) { // Checks what the score is
    if ((V == 50) && (Go)) {
        win.classList.remove('hidden');
        done = true;
    }
}

function updateBoard(V) {  // Changes score board
    score_board.innerText = String(V);
}

function resetStates() {  // Clears all the states that had been entered, hiding the board again
    first_time = true;
    Time_on = false;
    Go = true;
    entered_states.forEach(hideAway);  // Calls hide function on the,
    entered_states.clear();
    endScreen("S");
}

function hideAway(item) {  // Gets state elements and then hides them
    state_string = String(item);
    state_string = state_string.toLowerCase();
    request = document.getElementById(state_string);  // Get state
    request.classList.add("hidden"); // Hides it
}

function state_close() {  // Leaves the state game
    checkScore(scoreVal);
    state_div.classList.remove('activate');
    state_div.classList.add('hidden');
    options.classList.remove('hidden'); // shows start menu
    resetStates();
}

/**************************************************TIMER****************************************************/ 
// Variables for Timer
let Time_on = false;
var countDownDate = getTimeStamp() + 300000;
let Go = true;
let done = false;

function getTimeStamp() {  // Gets the time 
    var d = new Date();
    var n = d.getTime();
    return n;
}

function hide_back() {  // Hides the background
    win.classList.add('hidden');
    stop = true;
}

// Function snipped from: https://www.educative.io/edpresso/how-to-create-a-countdown-timer-using-javascript
var myfunc = setInterval(function() {
    if (!Time_on){
        countDownDate = countDownDate + 1000;
    }

    if ((done) && (!stop)) {
        Go = false;
        Time_on = false;
        countDownDate = getTimeStamp() + 300000;
        done = false;
        setTimeout(state_close, 5000);
        setTimeout(hide_back, 6000);
    }
    else {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
        // Calculating the minutes and seconds left;
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            
        // Result is output to the specific element
        document.getElementById("mins").innerHTML = minutes + "m" 
        document.getElementById("secs").innerHTML = seconds + "s" 
            
        // Display the message when countdown is over
        if (timeleft < 0) {
            Go = false;
            Time_on = false;
            done = false;
            countDownDate = getTimeStamp() + 300000;
            state_close();
        }
    }
}, 1000);

/********************************************************JSON WORK************************************/

let questions_p;
getJSON_p();

function getJSON_p() {  // Needed Tims Help to make it into a global array to use question method
    $.getJSON("data/poke_data.json", function(json) {
        questions_p = json;
    })// this will show the info it in firebug console
}


let questions_c;
getJSON_c();

function getJSON_c() {  // Needed Tims Help to make it into a global array to use question method
    $.getJSON("data/cow_data.json", function(json) {
        questions_c = json;
    })// this will show the info it in firebug console
}

/**********************************************STATES ARRAY******************************************/
let states = 
[
    "ALABAMA",
    "ALASKA",
    "AMERICAN SAMOA",
    "ARIZONA",
    "ARKANSAS",
    "CALIFORNIA",
    "COLORADO",
    "CONNECTICUT",
    "DELAWARE",
    "FLORIDA",
    "GEORGIA",
    "GUAM",
    "HAWAII",
    "IDAHO",
    "ILLINOIS",
    "INDIANA",
    "IOWA",
    "KANSAS",
    "KENTUCKY",
    "LOUISIANA",
    "MAINE",
    "MARYLAND",
    "MASSACHUSETTS",
    "MICHIGAN",
    "MINNESOTA",
    "MISSISSIPPI",
    "MISSOURI",
    "MONTANA",
    "NEBRASKA",
    "NEVADA",
    "NEW HAMPSHIRE",
    "NEW JERSEY",
    "NEW MEXICO",
    "NEW YORK",
    "NORTH CAROLINA",
    "NORTH DAKOTA",
    "OHIO",
    "OKLAHOMA",
    "OREGON",
    "PENNSYLVANIA",
    "PUERTO RICO",
    "RHODE ISLAND",
    "SOUTH CAROLINA",
    "SOUTH DAKOTA",
    "TENNESSEE",
    "TEXAS",
    "UTAH",
    "VERMONT",
    "VIRGIN ISLANDS",
    "VIRGINIA",
    "WASHINGTON",
    "WEST VIRGINIA",
    "WISCONSIN",
    "WYOMING"
];

