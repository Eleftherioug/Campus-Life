// Wait for the page content to load before running any JavaScript.
document.addEventListener("DOMContentLoaded", function () {
    // Button event: keep the existing click interaction on the home page.
    const button = document.getElementById("testButton");
    const output = document.getElementById("output");

    if (button && output) {
        button.addEventListener("click", function () {
            output.textContent = "Button clicked! JavaScript is working.";
        });
    }

    // API fetch logic: load sample event data anywhere an events container exists.
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
            // Clear the container before adding new event cards.
            eventsContainer.innerHTML = "";

            // Loop through the API results and build one Bootstrap card per item.
            posts.forEach(function (post, index) {
                const column = document.createElement("div");
                column.className = "col-md-4";

                const card = document.createElement("div");
                card.className = "card h-100 shadow-sm";

                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                const cardTitle = document.createElement("h3");
                cardTitle.className = "card-title h5";
                cardTitle.textContent = "Campus Update " + (index + 1);

                const cardSubtitle = document.createElement("p");
                cardSubtitle.className = "text-primary fw-semibold mb-2";
                cardSubtitle.textContent = post.title;

                const cardText = document.createElement("p");
                cardText.className = "card-text";
                cardText.textContent =
                    "Student announcement: " +
                    post.body.charAt(0).toUpperCase() +
                    post.body.slice(1);

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardSubtitle);
                cardBody.appendChild(cardText);
                card.appendChild(cardBody);
                column.appendChild(card);
                eventsContainer.appendChild(column);
            });
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
