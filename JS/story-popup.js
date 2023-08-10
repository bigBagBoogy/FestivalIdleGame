const showPopupButton = document.getElementById("showPopup");
const closePopupButton = document.getElementById("closePopup");
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popupImage");
const popupText = document.getElementById("popupText");

showPopupButton.addEventListener("click", () => {
  popup.style.right = "0";
  // Replace with your image source and text content
  popupImage.src = "your_image_path.jpg";
  popupText.textContent = "Your popup text goes here.";
});

closePopupButton.addEventListener("click", () => {
  popup.style.right = "-300px";
});
