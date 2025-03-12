const DEPTH = 5;

function triangle() {
    const center = getCenter();
    recursion(center.x, center.y - 300, 300, 300);
}

async function recursion(topX, topY, width, height, depth = 0) {
    if (depth >= DEPTH) return;

    move(topX, topY); // Top corner

    await line(topX - width / 2, topY + height); // move to left corner
    await line(topX + width / 2, topY + height); // move to right corner
    await line(topX, topY); // move to top corner

    await recursion(topX - width / 2, topY, width / 2, height / 2, depth + 1);
    await recursion(topX + width / 2, topY, width / 2, height / 2, depth + 1);
    await recursion(topX, topY + height, width / 2, height / 2, depth + 1);
}