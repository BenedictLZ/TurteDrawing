import { getCenter, move, line } from "../turtle.js";

const STEP_SIZE = 75;
const COLORS = ["rgb(255,42,0)", "rgb(255,85,0)", "rgb(229,115,0)", "rgb(229,115,0)", "rgb(218,182,0)", "rgb(220,220,0)", "rgb(180,215,0)", "rgb(117,177,0)", "rgb(70,141,0)", "rgb(70,141,0)", "white"];

export function tree() {
    const center = getCenter();
    const x = center.x;
    const y = center.y + 300;
    move(x, y);
    line(x, y - STEP_SIZE, COLORS[0]).then(() => treeRec(x, y - STEP_SIZE, - Math.PI / 2, 1));
}

async function treeRec(x, y, angle, depth) {
    if (depth >= COLORS.length) return;

    const angleDiff = Math.random() * Math.PI / 16 + Math.PI / 16;
    const angleLeft = angle + angleDiff;
    const angleRight = angle - angleDiff;

    const xLeft = Math.cos(angleLeft) * STEP_SIZE + x;
    const yLeft = Math.sin(angleLeft) * STEP_SIZE + y;
    const xRight = Math.cos(angleRight) * STEP_SIZE + x;
    const yRight = Math.sin(angleRight) * STEP_SIZE + y;

    const color = COLORS[depth];

    move(x, y);
    await line(xLeft, yLeft, color);
    move(x, y);
    await line(xRight, yRight, color);

    await treeRec(xLeft, yLeft, angleLeft, depth + 1);
    await treeRec(xRight, yRight, angleRight, depth + 1);
}