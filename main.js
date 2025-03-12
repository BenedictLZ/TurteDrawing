document.getElementById("triangle-btn").addEventListener("click", triangle);
document.getElementById("tree-btn").addEventListener("click", tree);
document.getElementById("move-path-btn").addEventListener("click", movePath);
document.getElementById("draw-box").addEventListener("click", drawBox);
document.getElementById("santa-house").addEventListener("click", drawSantasHouse);

document.getElementById("speed-input").addEventListener("input", (e) => setAnimationSpeed(e.target.value));
document.getElementById("immediate-btn").addEventListener("click", (e) => {
    e.target.classList[isImmediate() ? "remove" : "add"]("btn-enabled");
    setImmediate(!isImmediate());
});
document.getElementById("clear-btn").addEventListener("click", clear);