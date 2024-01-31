const container = document.getElementById("zoom-container");
const img = document.querySelector("#zoom-container>.swiper>.swiper-wrapper>.swiper-slider>img");

function normalizeImage(_img)
{
    _img.style.transformOrigin = "center";
    _img.style.transform = "scale";
}

function localMousePositionX(_context)
{
    return _context.clientX - _context.target.offsetLeft;
}

function localMousePositionY(_context)
{
    return _context.clientY - _context.target.offsetTop;
}

function moveImage(_img, _x, _y, _scale)
{
    _img.style.transformOrigin = `${_x}px ${_y}px`;
    _img.style.transform = `scale(${_scale})`;
}

container.addEventListener('mousemove', (e) => {
    moveImage(img, localMousePositionX(e), localMousePositionY(e), 2);
});

container.addEventListener('mouseleave', normalizeImage(img));