const swiper = document.getElementsByClassName("portfolio-swiper");

var previousParent = "";

swiper.forEach(container => {
    container.addEventListener("onclick", () => {
        if(container.parentNode)
        {
            previousParent = container.parentNode.id;
            container.classList.remove('portfolio-container');
            document.getElementById("zoom-container").appendChild(container);
            document.getElementById("zoom-container").classList.remove('.hidden');
        }
    })
});
