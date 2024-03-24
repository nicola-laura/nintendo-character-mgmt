// CHARACTER DETAILS
document.addEventListener("DOMContentLoaded", function() {
  const listingWrappers = document.querySelectorAll(".listing-wrapper");

  listingWrappers.forEach(wrapper => {
    wrapper.addEventListener("click", function() {
      const name = wrapper.querySelector(".name").textContent;
      const role = wrapper.querySelector(".role").textContent;
      const species = wrapper.querySelector(".species").textContent;
      const homeland = wrapper.querySelector(".homeland").textContent;
      const statusText = wrapper.querySelector(".status").textContent.trim();
      const profilePic = wrapper.querySelector(".profile img").src;
      let status = '';

      if (statusText === 'On a mission') {
        status = 'mission';
      } else if (statusText === 'Available') {
        status = 'available';
      } else if (statusText === 'Missing') {
        status = 'alert';
      }

      localStorage.setItem("characterName", name);
      localStorage.setItem("characterRole", role);
      localStorage.setItem("characterSpecies", species);
      localStorage.setItem("characterHomeland", homeland);
      localStorage.setItem("characterStatusText", statusText);
      localStorage.setItem("characterStatus", status);
      localStorage.setItem("characterProfilePic", profilePic);

      window.location.href = "../pages/profile.html";
    });
  });

  const name = localStorage.getItem("characterName");
  const role = localStorage.getItem("characterRole");
  const species = localStorage.getItem("characterSpecies");
  const homeland = localStorage.getItem("characterHomeland");
  const statusText = localStorage.getItem("characterStatusText");
  const status = localStorage.getItem("characterStatus");
  const profilePic = localStorage.getItem("characterProfilePic");

  if (name && role && species && homeland && statusText && status && profilePic) {
    document.querySelector(".profile-name p").textContent = name;
    document.querySelector(".profile-role p").textContent = role;
    document.querySelector(".profile-species p").textContent = species;
    document.querySelector(".profile-homeland p").textContent = homeland;
    document.querySelector(".status-text").textContent = statusText;
    document.querySelector(".profile-pic img").src = profilePic;

    const statusContainer = document.querySelector(".profile-status");
    statusContainer.classList.remove("mission", "available", "alert");
    statusContainer.classList.add(status);
  }
});

// EDIT CHARACTER
document.addEventListener("DOMContentLoaded", function() {
  const editBtn = document.getElementById("edit-btn");
  const editModal = document.querySelector(".edit-modal");
  const closeModal = document.querySelector(".edit-modal .close");
  const profilePreview = document.getElementById("profile-preview");
  const uploadImgInput = document.getElementById("upload-img");
  const resetImgInput = document.getElementById("reset-img");
  const editForm = document.getElementById("form");

  function openEditModal() {
    editModal.style.display = "flex";
    populateEditModalFields();
  }

  function populateEditModalFields() {
    const name = localStorage.getItem("characterName");
    const role = localStorage.getItem("characterRole");
    const species = localStorage.getItem("characterSpecies");
    const homeland = localStorage.getItem("characterHomeland");
    const status = localStorage.getItem("characterStatus");
    const profilePic = localStorage.getItem("characterProfilePic");

    document.getElementById("name").value = name;
    document.getElementById("role").value = role;
    document.getElementById("species").value = species;
    document.getElementById("homeland").value = homeland;
    document.getElementById(status).checked = true;
    profilePreview.src = profilePic;
  }

  function closeEditModal() {
    profilePreview.src = "../images/placeholder-img.png";
    editModal.style.display = "none";
  }

  editBtn.addEventListener("click", openEditModal);
  closeModal.addEventListener("click", closeEditModal);

  resetImgInput.addEventListener("click", function() {
    profilePreview.src = "../images/placeholder-img.png";
  });

  editForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const editedName = document.getElementById("name").value;
    const editedRole = document.getElementById("role").value;
    const editedSpecies = document.getElementById("species").value;
    const editedHomeland = document.getElementById("homeland").value;
    const editedStatus = document.querySelector('input[name="status"]:checked').id;
    const editedProfilePic = profilePreview.src;

    const statusMap = {
      available: { text: "Available", class: "available" },
      mission: { text: "On a mission", class: "mission" },
      alert: { text: "Missing", class: "alert" }
    };
  
    const status = statusMap[editedStatus];

    let statusText = '';
    if (editedStatus === 'available') {
      statusText = 'Available';
    } else if (editedStatus === 'mission') {
      statusText = 'On a mission';
    } else if (editedStatus === 'missing') {
      statusText = 'Missing';
    }

    localStorage.setItem("characterName", editedName);
    localStorage.setItem("characterRole", editedRole);
    localStorage.setItem("characterSpecies", editedSpecies);
    localStorage.setItem("characterHomeland", editedHomeland);
    localStorage.setItem("characterStatusText", statusText);
    localStorage.setItem("characterStatus", editedStatus);
    localStorage.setItem("characterProfilePic", editedProfilePic);

    window.location.href = "../pages/profile.html";
  });

  uploadImgInput.addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        profilePreview.src = event.target.result;
      }
      reader.readAsDataURL(file);
    }
  });
});
