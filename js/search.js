// SEARCH CHARACTER
const searchInput = document.querySelector(".searchbar input");
const listingWrappers = document.querySelectorAll(".listing-wrapper");
const noResultsMessage = document.querySelector(".no-results");

searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let hasResults = false;

    listingWrappers.forEach(function(listingWrapper) {
        const name = listingWrapper.querySelector(".name").textContent.trim().toLowerCase();

        if (name.includes(searchTerm)) {
            listingWrapper.style.display = "grid";
            hasResults = true;
        } else {
            listingWrapper.style.display = "none";
        }
    });

    if (hasResults) {
        noResultsMessage.style.display = "none";
    } else {
        noResultsMessage.style.display = "block";
    }
});
