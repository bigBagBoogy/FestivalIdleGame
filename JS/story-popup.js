const showPopupButton = document.getElementById("storylinePopup"); //temp button for testing
const closeStoryPopupButton = document.getElementById("closeStorylinePopup"); //temp button for testing
const popup = document.getElementById("storylinePopupDiv");
const popupImage = document.getElementById("storylinePopupImage");
const popupText = document.getElementById("storylinePopupText");

showPopupButton.addEventListener("click", () => {
  popup.style.right = "0";
  // Replace with your image source and text content
  popupImage.src = "./images/audio.png";
  popupText.textContent = "Your popup text goes here.";
});

closeStoryPopupButton.addEventListener("click", () => {
  popup.style.right = "-300px";
});
