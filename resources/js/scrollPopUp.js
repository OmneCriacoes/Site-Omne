const wpp = document.querySelector('#whatsapp');
let timeout;

window.addEventListener("scroll", () => {
    if(timeout) clearTimeout(timeout);

    showObject(wpp);

    timeout = setTimeout(() => { hideObject(wpp); }, 3000);
});

function hideObject(_object)
{
    _object.classList.add("hidden");
}

function showObject(_object)
{
    _object.classList.remove("hidden");
}