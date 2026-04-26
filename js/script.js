// Wait for the DOM to load before attaching events or updating the page.
document.addEventListener("DOMContentLoaded", function () {
    // Handle the home page test button without affecting other pages.
    const button = document.getElementById("testButton");
    const output = document.getElementById("output");

    if (button && output) {
        button.addEventListener("click", function () {
            output.textContent = "Button clicked! JavaScript is working.";
        });
    }

    // Load sample event data anywhere an events container is present.
    const eventsContainer = document.getElementById("eventsContainer");

    if (!eventsContainer) {
        return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Unable to load event data.");
            }

            return response.json();
        })
        .then(function (posts) {
            // Render fetched posts as Bootstrap cards for a cleaner layout.
            eventsContainer.innerHTML = posts
                .map(function (post) {
                    return `
                        <div class="col-md-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h3 class="card-title h5">${post.title}</h3>
                                    <p class="card-text">${post.body}</p>
                                </div>
                            </div>
                        </div>
                    `;
                })
                .join("");
        })
        .catch(function () {
            // Show a helpful error message if the API request fails.
            eventsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger mb-0">
                        Unable to load events right now. Please try again later.
                    </div>
                </div>
            `;
        });
});
