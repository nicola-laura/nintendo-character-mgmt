function convertToCSV(data) {
  const header = ["Profile", "Name", "Role", "Species", "Homeland", "Status"];
  const csvRows = [header.join(',')];

  data.forEach(item => {
    const profile = item.querySelector('.profile img').src;
    const name = item.querySelector('.name').textContent;
    const role = item.querySelector('.role').textContent;
    const species = item.querySelector('.species').textContent;
    const homeland = item.querySelector('.homeland').textContent;
    const status = item.querySelector('.status p').textContent;
    csvRows.push([profile, name, role, species, homeland, status].join(','));
  });

  return csvRows.join('\n');
}

function downloadCSV() {
  const listings = document.querySelectorAll('.listing-wrapper');
  const csvContent = convertToCSV(listings);

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'listing_data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

document.querySelector('.nav-btn.download').addEventListener('click', downloadCSV);