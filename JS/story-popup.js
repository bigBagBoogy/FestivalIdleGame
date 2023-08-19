const showPopupButton = document.getElementById("storylinePopupButton"); //temp button for testing
const closeStoryPopupButton = document.getElementById("closeStorylinePopup"); //temp button for testing
const popup = document.getElementById("storylinePopupDiv2");
const popupImage = document.getElementById("storylinePopupImage");
const popupText = document.getElementById("storylinePopupText");

showPopupButton.addEventListener("click", () => {
  popup.style.right = "0";
  // Replace with your image source and text content
  popupImage.src = "images/Maarten-popup.png";
  popupText.textContent = "Welcome to Graspop Festival!";
});

closeStoryPopupButton.addEventListener("click", () => {
  popup.style.right = "-800px";
});
