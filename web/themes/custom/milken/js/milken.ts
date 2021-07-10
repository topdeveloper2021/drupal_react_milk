/**
 * @file
 * Basic javascript for the milken theme.
 *
 * The extra line between the end of the @file docblock
 * and the file-closure is important.
 */

// Scroll to top button
function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.querySelector("html").style.scrollBehavior='smooth';

document.querySelector("#scroll_to_top").addEventListener("click", (e) => {
    console.debug("ScrollTopClicked: ", e.currentTarget)
    scrollTop();
});

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        document.querySelector('#scroll_to_top').classList.add('header_scroll');
    }
    else {
        document.querySelector('#scroll_to_top').classList.remove('header_scroll');
    }
});
// END OF Scroll to top button