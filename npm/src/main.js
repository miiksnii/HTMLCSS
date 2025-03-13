import '/src/style.scss';
console.log("working");

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.querySelector('#navbarBasicExample');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle 'is-active' class on both the burger and menu
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    }
});


document.getElementById('buyDomainBtn').addEventListener('click', () => {
    // You can use window.location to navigate to another page, for example:
    window.location.href = '/FindDomain.html';

    // Or you can display an alert or execute any other logic
    // alert("Redirecting to domain purchase...");
});
