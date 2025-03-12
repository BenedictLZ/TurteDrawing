const initialLength = 300;

async function movePath() {

    console.log('Started Path....')

    const center = getCenter();
    const x = center.x;
    const y = center.y + 300;

    // setImmediate(true)
    setDirection(270)

    move(x, y);
    await drawBranch(initialLength)
}

/** 
 * Für den Anfang: Zeichnet mal ein Viereck
 * Befehle: moveForward, turn
 */
async function drawBox() {
    const center = getCenter();
    const length = 200;

    move(center.x, center.y);

    turn(135)
    await moveForward(length);
    turn(90)
    await moveForward(length);
    turn(90)
    await moveForward(length);
    turn(90)
    await moveForward(length);
}

/** 
 * Für den Anfang: Zeichnet mal ein Viereck
 * Befehle: moveForward, turn
 */
async function drawSantasHouse() {
    const center = getCenter();
    const length = 200;
    const dia = length / Math.sqrt(2);

    move(center.x, center.y);

    await moveForward(length);
    turn(-135);
    await moveForward(2 * dia);
    turn(135);
    await moveForward(length);
    turn(-135);
    await moveForward(dia);
    turn(-90);
    await moveForward(dia);
    turn(-45);
    await moveForward(length);
    turn(-135);
    await moveForward(2 * dia);
    turn(135);
    await moveForward(length);
}

/**
 * Fraktal zeichnen
 */
async function drawBranch(length) {

    /**
     * Erste Aufgabe:
     * Winkel ändern, Ratio ändern, Rekursionstiefe ändern 
     */
    length = Math.floor(length * 0.7)

    if (length <= 10) return;

    /**
     * Zweite Aufgabe:
     * Berechne Farbwert anhand des Verhältnisses zur initialen Länge
     */
    // const color = "rgb(200, 202, 102)"
    const red = Math.floor(255 - (255 * (length / initialLength)))
    const green = Math.floor(255 * (length / initialLength))

    let color = `rgb(${red}, ${green}, 102)`

    /**
     * Bonus: Blütenfarbe
     */
    if (length < 20)
        color = "rgb(255, 3, 192)"

    await moveForward(length, color)

    turn(-30)
    // step in Recursion
    await drawBranch(length)

    turn(60)
    // step in Recursion
    await drawBranch(length)

    turn(-30)
    await moveBack(length, color)

}
