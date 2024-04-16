const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener("scroll", ()=> {
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