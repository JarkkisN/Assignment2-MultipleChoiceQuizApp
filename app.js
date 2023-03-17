// Add event listener for DOMContentLoaded to ensure the HTML content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Fetch the questions JSON file
    fetch("questions.json")
      // Convert the response to JSON
      .then(response => response.json())
      // Process the JSON data
      .then(data => {
        // Display the questions on the page
        displayQuestions(data);
        // Add a click event listener to the submit button to check answers when clicked
        document.getElementById("submit").addEventListener("click", function() {
          checkAnswers(data);
        });
      });
  });
  
  // Function to display the questions and options on the page
  function displayQuestions(questions) {
    // Get the quiz container element
    const quizContainer = document.getElementById("quiz");
    // Iterate through each question
    questions.forEach((question, index) => {
        // Create a div element for the question
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("mb-4");
         // Set the inner HTML of the question div to display the question text
        questionDiv.innerHTML = `<p>${question.question}</p>`;
        // Create a new div for the options
        const optionsDiv = document.createElement("div");
        // Iterate through each option
        question.options.forEach((option, i) => {
        // Create a label element for the option
        const label = document.createElement("label");
        label.classList.add("d-block");
        // Set the inner HTML of the label to display the radio button and option text
        label.innerHTML = `<input type="radio" name="question${index}" value="${i}"> ${option}`;
        // Append the label to the options div
        optionsDiv.appendChild(label);
      });
      // Append the options div to the question div
      questionDiv.appendChild(optionsDiv);
      // Append the question div to the quiz container
      quizContainer.appendChild(questionDiv);
    });
  }
  
  // Function to check the answers and display the results
  function checkAnswers(questions) {
    // Initialize the correct answers count
    let correctAnswers = 0;
    // Iterate through each question
    questions.forEach((question, index) => {
      // Get the selected option for the current question
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      // Check if the selected option is correct and increment the correct answers count
      if (selectedOption && parseInt(selectedOption.value) === question.correctAnswer) {
        correctAnswers++;
      }
    });
    // Display the results
    document.getElementById("results").innerHTML = `You got ${correctAnswers} correct answers out of ${questions.length} questions.`;
  }
  