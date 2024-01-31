const nav = document.querySelector('nav');
const wpp = document.querySelector('#whatsapp');
let navTimeout, lastScrollY = window.scrollY;
let wppTimeout, wppHovered = false, wppFocused = false;

function hideObject(_object)
{
    _object.classList.add("hidden");
}

function showObject(_object)
{
    _object.classList.remove("hidden");
}

function stickyObject(_object, _scrolled)
{
    if(document.documentElement.scrollTop > _scrolled) { _object.classList.add("sticky"); }
    else { _object.classList.remove("sticky"); }
}

window.addEventListener('scroll', () => {
    if(wppTimeout) clearTimeout(wppTimeout);
    showObject(wpp);

    if(!wppHovered && !wppFocused) { wppTimeout = setTimeout(() => { hideObject(wpp); }, 3000); } /* Preciso checar o porque disso estar funcionando */


    if(document.documentElement.scrollTop > 100)
    {
        if(lastScrollY < window.scrollY) { nav.classList.add("nav-hidden"); }
        else { nav.classList.remove("nav-hidden"); };
        lastScrollY = window.scrollY;

        nav.classList.add("sticky");
    }
    else
    {
        nav.classList.remove("sticky");
    }
});

wpp.addEventListener('mouseover', () => {
    if(wppTimeout) clearTimeout(wppTimeout);

    showObject(wpp);

    wppHovered = true;
});

wpp.addEventListener('mouseleave', () => {
    wppHovered = false;

    wppTimeout = setTimeout(() => { hideObject(wpp); }, 1500);
});

wpp.addEventListener('focus', () => {
    if(wppTimeout) clearTimeout(wppTimeout);

    showObject(wpp);

    wppFocused = true;
});

wpp.addEventListener('blur', () => {
    wppFocused = false;

    wppTimeout = setTimeout(() => { hideObject(wpp); }, 1500);
});