export function switchTab() {
    const tab = document.querySelector(".tab");
    const underline = document.querySelector(".underline");
    const tabLinks = document.querySelectorAll(".tab button");
    const tabContentElements = document.querySelectorAll(".tab-content");

    // Set the first tab as active by default
    tabLinks[0].classList.add("active");
    underline.style.width = `${tabLinks[0].offsetWidth}px`;
    underline.style.left = `${tabLinks[0].offsetLeft}px`;
    tabContentElements[0].style.display = "block";

    tab.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON") {
            // Remove active class from all tabs
            Array.from(tabLinks).forEach((tab) => tab.classList.remove("active"));

            // Hide all tab contents
            Array.from(tabContentElements).forEach(
                (content) => (content.style.display = "none")
            );

            // Add active class to clicked tab
            e.target.classList.add("active");

            // Show content of clicked tab
            const tabId = e.target.dataset.tabId;
            document.getElementById(tabId).style.display = "block";

            // Move the underline
            underline.style.width = `${e.target.offsetWidth}px`;
            underline.style.left = `${e.target.offsetLeft}px`;
        }
    });
}
