const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const pos = { x: 0, y: 0 };

let animationSpeed = 1000;
let immediateDrawing = false;

/**
 * 
 * @returns the center of the screen
 */
export function getCenter() {
    return { x: canvas.width / 2, y: canvas.height / 2 };
}

/**
 * Specifies the amount of pixel it can draw in one second.
 * @param {number} length 
 */
export function setAnimationSpeed(length) {
    animationSpeed = length;
}

/**
 * 
 * @returns the current value for the animation speed
 */
export function getAnimationSpeed() {
    return animationSpeed;
}

/**
 * If set to true, all further line drawings will happen immediately.
 * @param {boolean} enable 
 */
export function setImmediate(enable) {
    immediateDrawing = enable;
}

/**
 * 
 * @returns if immediate drawing is enabled
 */
export function isImmediate() {
    return immediateDrawing;
}

/**
 * Clears the canvas.
 */
export function clear() {
    ctx.reset();
}

/**
 * Moves the turtle to the provided coordinate without drawing anything.
 * @param {number} x 
 * @param {number} y 
 */
export function move(x, y) {
    pos.x = x;
    pos.y = y;
}

/**
 * Draws a line from the current turtle position to the provided coordinate in the specified color.
 * @param {number} toX 
 * @param {number} toY 
 * @param {string} color default: red
 */
export async function line(toX, toY, color = "red") {
    ctx.strokeStyle = color;
    if (immediateDrawing) {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(toX, toY);
        pos.x = toX;
        pos.y = toY;
        ctx.stroke();
        return;
    }
    return new Promise((resolve, _reject) => {
        const time = Math.hypot(toX - pos.x, toY - pos.y) / animationSpeed;
        const startX = pos.x;
        const startY = pos.y
        const x = (t) => t * (toX - startX) / time + startX;
        const y = (t) => t * (toY - startY) / time + startY;
        let t = 0;
        let lastExec = Date.now();
        draw();
        function draw() {
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            if (t >= time) {
                ctx.lineTo(toX, toY);
                ctx.stroke();
                pos.x = toX;
                pos.y = toY;
                return resolve();
            }
            pos.x = Math.round(x(t));
            pos.y = Math.round(y(t));
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            const timeDiff = (Date.now() - lastExec) / 1000;
            t += timeDiff;
            lastExec = Date.now();
            window.requestAnimationFrame(draw);
        }
    });
}