function Board(width, height, blockWidth, blockHeight) {
    this.elm    = document.getElementById("board");
    this.width  = width;
    this.height = height;

    this.elm.style.width    = this.width * blockWidth + "px";
    this.elm.style.height   = this.height * blockHeight + "px";
}