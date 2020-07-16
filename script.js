function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function map(val, currX, currY, newX, newY) {
    return val * (newY - newX) / (currX, currY);
}
class Star {
    constructor(maxW, maxH, randomize = false) {
        this.maxWidth = maxW;
        this.maxHeight = maxH;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.size = 0;
        if (randomize)
            this.randomize();
        this.element = document.getElementsByClassName("star")[0].cloneNode();
    }
    randomize() {
        this.x = randInt(-this.maxWidth / 2, this.maxWidth / 2);
        this.y = randInt(-this.maxHeight / 2, this.maxHeight / 2)
        this.z = randInt(0, this.maxWidth);
    }
    move(speed) {
        this.z -= speed;
        if (this.z < 1) {
            this.z = this.maxWidth;
            this.x = randInt(-this.maxWidth / 2, this.maxWidth / 2);
            this.y = randInt(-this.maxHeight / 2, this.maxHeight / 2)
        }
    }

    place(maxSize) {
        let sx = map(this.x / this.z, 0, 1, 0, this.maxWidth);
        let sy = map(this.y / this.z, 0, 1, 0, this.maxHeight);
        let size = maxSize - map(this.z, 0, this.maxWidth, 0, maxSize);
        this.element.style.top = `${sy}px`;
        this.element.style.left = `${sx}px`;
        this.element.style.borderWidth = `${size}px`;
    }
    display(maxSize) {
        this.place(maxSize);
        this.element.style.visibility = "visible";
    }
}

function getRandomStars(count, maxW, maxH) {
    let stars = []
    for (var i = 0; i < count; i++)
        stars.push(new Star(maxW, maxH, true));
    return stars;
}


const width = Math.min(window.screen.width, window.screen.height);

const Stars = getRandomStars(800, width / 2, width / 2);
Stars.forEach(star => {
    document.getElementById("screen").appendChild(star.element);
});

Stars.forEach(star => {
    star.randomize();
    star.display(5);
});


function cycle() {
    Stars.forEach((star, index) => {
        star.move(10);
        star.display(5);
    });
}



// cycle();
setInterval(cycle, 20);