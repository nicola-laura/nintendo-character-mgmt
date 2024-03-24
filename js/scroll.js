// 'INFINITE' SCROLL
window.onload = function() {
  let content = document.getElementById('infinite');
  let itemsPerPage = 5;
  let currentPage = 1;
  let isLoading = false;

  let listingWrappers = document.querySelectorAll('.listing-wrapper');
  listingWrappers.forEach(function(wrapper) {
    wrapper.style.display = 'none';
  });

  for (let i = 0; i < itemsPerPage && i < listingWrappers.length; i++) {
    listingWrappers[i].style.display = 'grid';
  }

  window.onscroll = function() {
    if (!isLoading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      loadMoreItems();
    }
  };

  function loadMoreItems() {
    isLoading = true;

    let loader = document.createElement('div');
    loader.className = 'loader-bottom';
    loader.innerHTML = 'Loading...';
    document.body.appendChild(loader);

    setTimeout(function() {
      let startIndex = currentPage * itemsPerPage;
      let endIndex = startIndex + itemsPerPage;

      for (let i = startIndex; i < endIndex && i < listingWrappers.length; i++) {
        listingWrappers[i].style.display = 'grid';
      }

      currentPage++;
      isLoading = false;

    document.body.removeChild(loader);
    }, 500);
  }
};
