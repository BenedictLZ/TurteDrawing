import { tree } from "./drawings/tree.js";
import { triangle } from "./drawings/triangle.js"
import { clear, setImmediate, isImmediate, setAnimationSpeed } from "./turtle.js";

document.getElementById("triangle-btn").addEventListener("click", triangle);
document.getElementById("tree-btn").addEventListener("click", tree);

document.getElementById("speed-input").addEventListener("input", (e) => setAnimationSpeed(e.target.value));
document.getElementById("immediate-btn").addEventListener("click", (e) => {
    e.target.classList[isImmediate() ? "remove" : "add"]("btn-enabled");
    setImmediate(!isImmediate());
});
document.getElementById("clear-btn").addEventListener("click", clear);