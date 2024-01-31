import { showObject, hideObject } from "./scrollPopUp.js";

const nav = document.querySelector('nav');
let timeout, hovered = false, focused = false;

window.addEventListener("scroll", ()=> {
    if(document.documentElement.scrollTop > 100)
    {
        nav.classList.add("sticky");

        showObject(nav);

        nav.addEventListener('mouseover', () => {
            if(timeout) clearTimeout(timeout);

            showObject(nav);

            hovered = true;
        });

        nav.addEventListener('mouseleave', () => {
            hovered = false;

            timeout = setTimeout(() => { hideObject(nav); }, 1500);
        });

        nav.addEventListener('focus', () => {
            if(timeout) clearTimeout(timeout);

            showObject(nav);

            focused = true;
        });

        nav.addEventListener('blur', () => {
            focused = false;

            timeout = setTimeout(() => { hideObject(nav); }, 1500);
        });
    }
    else
    {
        nav.classList.remove("sticky");

        hovered = false;
        focused = false;
        if(timeout) clearTimeout(timeout);
        showObject(nav);
        nav.removeEventListener('mouseover');
        nav.removeEventListener('mouseleave');
        nav.removeEventListener('focus');
        nav.removeEventListener('blur');
    }
});