// BUTTON CLICK EVENT
document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("testButton");
    const output = document.getElementById("output");

    if (button) {
        button.addEventListener("click", function () {
            output.innerHTML = "Button clicked! JavaScript is working 🎉";
        });
    }

    // API PLACEHOLDER (not required to fully work yet)
    const eventsContainer = document.getElementById("eventsContainer");

    if (eventsContainer) {
        eventsContainer.innerHTML = "Loading events... (API will go here)";
    }
});