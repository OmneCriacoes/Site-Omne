const carousels = document.querySelectorAll(".logo-carousel");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
{
    addAnimation(carousels);
}

function addAnimation(_scrollers)
{
    _scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);
    });
}