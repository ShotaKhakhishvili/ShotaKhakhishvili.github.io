let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scroll Down
        header.style.top = "-150px"; // Adjust this value based on your header's height
    } else {
        // Scroll Up
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
});