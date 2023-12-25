// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the id of the containing time-block
    var timeBlockId = $(this).parent().attr("id");
    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();
    // Save the user input in local storage using the time block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function () {
    // Get the id of the time block
    var timeBlockId = $(this).attr("id");
    // Get the current hour in 24-hour format
    var currentHour = dayjs().format("H");
    // Compare the id to the current hour and add the corresponding class
    if (timeBlockId < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockId === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });


  // Display the current date in the header
  $("#currentDay").text(dayjs().format("MMM DD, YYYY [at] hh:mm:ss a"));


  // Get all the div elements
  var divs = document.getElementsByTagName('div');

  // Loop through each div element
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];

    // Check the class of the div element
    if (div.classList.contains('present')) {
      div.classList.add = 'present';
    } else if (div.classList.contains('future')) {
      div.classList.add('future');
    } else if (div.classList.contains('past')) {
      div.classList.add('past');
    }
  }
});


// Get the current date
var currentDate = dayjs().format("YYYY-MM-DD");

// Get the container element for time slots
var timeSlotsContainer = $(".container-lg");

// Loop from 9am to 5pm
for (var hour = 9; hour <= 17; hour++) {
  // Create a new time slot element
  var timeSlot = $("<div>").addClass("row time-block");

  // Create a label for the time slot
  var timeLabel = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(dayjs().hour(hour).format("hA"));

  // Create an input field for the event
  var eventInput = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3").val(localStorage.getItem(currentDate + "-event-" + hour));

  // Create a save button for the time slot
  var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>');

  // Add different classes based on the time
  if (hour < dayjs().hour()) {
    timeSlot.addClass("past");
  } else if (hour === dayjs().hour()) {
    timeSlot.addClass("present");
  } else {
    timeSlot.addClass("future");
  }

  // Append the label, input field, and save button to the time slot
  timeSlot.append(timeLabel, eventInput, saveButton);

  // Append the time slot to the container
  timeSlotsContainer.append(timeSlot);
}