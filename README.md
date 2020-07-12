# Quizoro
### By Garret Andreine

Welcome to Quizoro! An all in one HTML/CSS/JS based website that allows you, the user, to engage in three different type of quizzes. Inspired by Retro Arcades and Tim Tregubov's ideas, journey back in time to the 80s and see what all the fun was about. You can find out what type of Cow you are, you can see what rank of Pokemon Player you are, and you can try to guess all 50 States in under 5 minutes! Check the Scorboard to keep track of how well you do!  

This website was, as said, a retro inspired quiz to satisfy the Lab 4. I went for the CSS route but I also used JSON to load in files, so both maybe? The Pokemon quiz is a slide show quiz that works by adding button elements to a grid and then popping them off as you move along in the questions. The background (which is on a CSS animation) changes depending on if you get the right or wrong answer. At the end your score is used to determine your ranking and thus your end screen, score is calculated with a gain of 1 for every question right. Maximum points is 15. The cow quiz is very similar to the pokemon quiz only there is no right or wrong answers. Instead the ranking at the end is given to randomly weighted questions... sorta randomly weighted. The valeus for the questions never change but there is no method to which answers are worth what. A random number generator was used to pick the score. At the end the score is calculated out of 60 possible points. All the data for the cow and pokemon quiz is loaded in from JSON files.   

The cowboy quiz is a step into the western world and involves hiding various divs when the user submits the correct answer on the form. The timer is started on the first submit and then goes for five minutes. At the end of the time the score is saved and their rank is shown based off the score they got. There username is also taken, which they enter, and then stored in local storage on their computer. Upon going to the leader board this data is taken from local storage and sorted with an insertion sort algorithim. After it is then appeneded to the list in descending order.  

All in all this lab took me an absurd amount of time, but it was a work of love. 

[deployed url](http://Quizoro.surge.sh)

## Inspired By
https://www.youtube.com/watch?v=rFWbAj40JrQ
https://www.youtube.com/watch?v=riDzcEQbX6k&t=134s
https://www.youtube.com/watch?v=J8QbjXdVl9c
https://www.youtube.com/watch?v=Dk_GMhM6c1w
https://www.youtube.com/watch?v=1za7xsjsUAA

## What Worked Well
- The State Quiz  
- Changing the Background  
- Finding Cool Buttons  
- Using Different Fonts  
- Win Screens for Pokemon/Cows  
- Clearing and Removing Status  

## What Didn't
- Creating a Timer  
- Making A Winner Winner Chicken Dinner Screen  
- Working with Local Storage  
- Organizing the Scoreboard  
- I wasn't very efficient with my code  
- Working with JSON was a struggle  

## Screenshots
The Main Screen  
<img src="ss\main.PNG">  

The Pokemon Quiz  
<img src="ss\poke.PNG">  

Getting An Answer Right  
<img src="ss\right.PNG">  

Getting An Answer Wrong
<img src="ss\wrong.PNG">  

The End Of The Pokemon Game  
<img src="ss\pokeend.PNG">  

The Cow Quiz  
<img src="ss\cow.PNG">  

The End Of The Cow Quiz  
<img src="ss\cowend.PNG">  

The State Quiz  
<img src="ss\state.PNG">  

The State Game  
<img src="ss\stategame.PNG">  

The End Of The State Game  
<img src="ss\stateEnd.PNG">  

The Leader Board  
<img src="ss\lead.PNG">  

The Blank Leader Board  
<img src="ss\blank.PNG">  