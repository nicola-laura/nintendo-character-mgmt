// ADD CHARACTER
function openAddModal() {
  const addBtn = document.getElementById("add-btn");
  const addModal = document.querySelector(".add-modal");
  const closeModal = document.querySelector(".add-modal .close");
  const form = document.getElementById("form");
  const submitBtn = document.getElementById('add-character')

  function openModal() {
    addModal.style.display = "flex";
    form.reset();
  }

  addBtn.addEventListener("click", openModal);
  closeModal.addEventListener("click", closeAddModal);

}
openAddModal();

function closeAddModal() {
  const addModal = document.querySelector(".add-modal");
  const profilePreview = document.getElementById("profile-preview");

  profilePreview.src = "./images/placeholder-img.png"

  addModal.style.display = "none";
}

const handleSubmit = (() => {
  const form = document.getElementById("form");
  const profilePreview = document.getElementById("profile-preview");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const species = document.getElementById("species").value;
    const homeland = document.getElementById("homeland").value;
    const statusValue = document.querySelector("input[type='radio'][name='status']:checked").id;

    const statusMap = {
      available: { text: "Available", class: "available" },
      mission: { text: "On a mission", class: "mission" },
      missing: { text: "Missing", class: "missing" }
    };

    const status = statusMap[statusValue];

    const character = {
      name: name,
      role: role,
      species: species,
      homeland: homeland,
      status: status.text,
      profile: profilePreview.src
    };

    let characters = JSON.parse(localStorage.getItem("characters")) || [];
    characters.push(character);
    localStorage.setItem("characters", JSON.stringify(characters));

    const listingWrapper = document.createElement("div");
    listingWrapper.classList.add("listing-wrapper");

    listingWrapper.innerHTML = `
      <div class="profile">
          <img src="${character.profile}" alt="profile">
      </div>
      <div class="name">${name}</div>
      <div class="role">${role}</div>
      <div class="species">${species}</div>
      <div class="homeland">${homeland}</div>
      <div class="status ${status.class}">
          <p>${status.text}</p>
      </div>
    `;

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.setAttribute("data-feather", "trash-2");
    listingWrapper.appendChild(deleteIcon);

    const listingContainer = document.querySelector(".listing-container");
    listingContainer.appendChild(listingWrapper);

    feather.replace();

    closeAddModal();
  });
})();

const handleImageUpload = (() => {
  const profileImageUpload = document.getElementById("upload-img");
  const profilePreview = document.getElementById("profile-preview");

  profileImageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
      profilePreview.parentElement.classList.add('profile');
    }
  });
})();

const resetImageUpload = (() => {
  const resetImageBtn = document.getElementById("reset-img");
  const profileImageUpload = document.getElementById("upload-img");
  const profilePreview = document.getElementById("profile-preview");

  resetImageBtn.addEventListener("click", function () {
    profileImageUpload.value = "";
    profilePreview.src = "./images/placeholder-img.png";
    profilePreview.parentElement.classList.remove('profile');

    const event = new Event("change");
    profileImageUpload.dispatchEvent(event);
  });
})();

// DELETE CHARACTER
document.addEventListener("DOMContentLoaded", function() {
  const deleteIcons = document.querySelectorAll(".delete-icon");

  deleteIcons.forEach(function(deleteIcon) {
    deleteIcon.addEventListener("click", function(event) {
      event.preventDefault();
      event.stopPropagation();

      const customModal = document.querySelector('.delete-modal');
      customModal.style.display = 'flex';

      const confirmButton = customModal.querySelector('.modal-btn.confirm');
      const cancelButton = customModal.querySelector('.modal-btn.cancel');

      function onDeleteConfirm() {
        const listingWrapper = deleteIcon.closest('.listing-wrapper');
        listingWrapper.remove();
        customModal.style.display = 'none';
        confirmButton.removeEventListener('click', onDeleteConfirm);
        cancelButton.removeEventListener('click', onCancel);
      }

      function onCancel() {
        customModal.style.display = 'none';
        confirmButton.removeEventListener('click', onDeleteConfirm);
        cancelButton.removeEventListener('click', onCancel);
      }

      confirmButton.addEventListener('click', onDeleteConfirm);
      cancelButton.addEventListener('click', onCancel);
    });
  });
});
