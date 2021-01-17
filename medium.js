const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;


let gameFrame = 0;

const Diamond = new Image();
Diamond.src = 'diamond.png'
const diamondarr = [];
class diamond {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;

    }
    update() {
        this.y += this.speed;
    }
    draw() {


        ctx.drawImage(Diamond, this.x - 30, this.y - 30, this.radius * 2, this.radius * 2);

    }
}

function handlediamonds() {
    if (gameFrame % 50 == 0) {
        diamondarr.push(new diamond());

    }
    for (let i = 0; i < diamondarr.length; i++) {
        diamondarr[i].update();
        diamondarr[i].draw();
        if (diamondarr[i].y < 0) {
            diamondarr.splice(i, 1);
        }
    }
    for (let i = 0; i < diamondarr.length; i++) {
        if (diamondarr[i].y < 0 - diamondarr[i].radius * 2) {
            diamondarr.splice(i, 1);
        }
    }
}
const bgfisharr = [];

///////////////////////////////////////
//for medium level
const medbg = new Image();
medbg.src = 'medium.png';
class medfish {
    constructor() {
        this.x = canvas.width + 100;
        this.y = Math.random() * (canvas.height) + 90;
        this.radius = 50;
        this.speed = Math.random() * 1 + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 497;
        this.spriteHeight = 324;
    }
    draw() {

        ctx.drawImage(medbg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 70, this.y - 60, this.spriteWidth / 3, this.spriteHeight / 4);
    }
    update() {
        this.x -= this.speed;

        if (gameFrame % 5 == 0) {
            this.frame++;
            if (this.frame >= 12) this.frame = 0;
            if (this.frame == 3 || this.frame == 7 || this.frame == 11)
                this.frameX = 0;
            else {
                this.frameX++;
            }
            if (this.frame < 3) this.frameY = 0;
            else if (this.frame < 7) this.frameY = 2;
            else if (this.frame < 11) this.frameY = 1;
            else this.frameY = 0;
        }
    }
}
const medbg1 = new medfish();
medbg1.src = 'medium.png';


function handlefishestoleftm() {
    medbg1.update();
    medbg1.draw();
    if (gameFrame % 100 == 0) {
        bgfisharr.push(new medfish());

    }
    for (let i = 0; i < bgfisharr.length; i++) {
        bgfisharr[i].update();
        bgfisharr[i].draw();
        if (bgfisharr[i].y < 0) {
            bgfisharr.splice(i, 3);
        }
    }
    for (let i = 0; i < bgfisharr.length; i++) {
        if (bgfisharr[i].y < 0 - bgfisharr[i].radius * 2) {
            bgfisharr.splice(i, 3);
        }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameFrame++;
    handlefishestoleftm();
    handlediamonds();
    requestAnimationFrame(animate);

}

animate();