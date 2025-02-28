const buyBtn = document.querySelector(".buy-button");



let isbuyBtnGreen = 0;
buyBtn.addEventListener("click", function () {
    // Change the button's background color to green
    if (isbuyBtnGreen) {
        buyBtn.style.backgroundColor = "#0d6efd";


        isbuyBtnGreen = 0;
    } else {
        buyBtn.style.backgroundColor = "green";
        isbuyBtnGreen = 1;
    }
});
