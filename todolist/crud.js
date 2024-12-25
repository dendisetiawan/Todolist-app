// Get modal element
var modal = document.getElementById("myModal");
var btn = document.getElementById("addTaskBtn");
var span = document.getElementsByClassName("close")[0];
var isEditing = false; // Flag to check if we are editing
var currentRow; // To store the current row being edited




function validateNIP() {
    const nipInput = document.getElementById('nip');
    const nipValue = nipInput.value;

    // Memastikan NIP hanya terdiri dari 5 angka
    if (!/^\d{5}$/.test(nipValue)) {
        alert('NIP harus terdiri dari 5 angka.');
        nipInput.focus();
        return false;
    }
    return true;
}

function getDayName() {
    const dateInput = document.getElementById('jam').value;
    const date = new Date(dateInput);
    const options = { weekday: 'long' };
    const dayName = date.toLocaleDateString('id-ID', options);
    alert('Hari: ' + dayName);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taskForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman form

        if (validateNIP()) {
            getDayName();
            // Jika valid, Anda bisa melanjutkan untuk mengirim data ke server atau melakukan tindakan lain
            alert('Form valid dan siap untuk disimpan.');
        }
    });
});
// When the user clicks the button, open the modal 
btn.onclick = function() {
    isEditing = false; // Reset editing flag
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById("taskForm").onsubmit = function() {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var name = document.getElementById("name").value.trim();
    var nip = document.getElementById("nip").value.trim();
    var jam = document.getElementById("jam").value.trim();

    // Check if fields are not empty
    if (!name || !nip || !jam) {
        alert("Semua field harus diisi!");
        return;
    }
  // Parse the input time
  var inputTime = new Date("" + jam + ":00"); // Create a date object for comparison
  var thresholdTime = new Date(" T08:00:00"); // 08:00 AM

  // Check the input time against the threshold
  if (inputTime < thresholdTime) {
      alert("Kamu tepat waktu");
  } else {
      alert("Kamu terlambat dan akan di denda perusahaan");
  }

    if (isEditing) {
        // Update the current row
        currentRow.cells[1].innerHTML = name; // Update Nama
        currentRow.cells[2].innerHTML = nip; // Update NIP
        currentRow.cells[3].innerHTML = jam; // Update Bukti Photo
    } else {
        // Add new row to the table
        var table = document.getElementById("itemTable");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML = rowCount + 1; // No
        row.insertCell(1).innerHTML = name; // Nama
        row.insertCell(2).innerHTML = nip; // NIP
        row.insertCell(3).innerHTML = jam; // Bukti Photo
        row.insertCell(4).innerHTML = '<button onclick="editRow(this)">Edit</button> <button onclick="deleteRow(this)">Hapus</button>'; // Actions
    }

    // Close the modal
    modal.style.display = "none";

    // Clear form fields
    document.getElementById("taskForm").reset();
}

// Function to delete a row
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateRowNumbers(); // Update row numbers after deletion
}

// Function to edit a row
function editRow(button) {
    currentRow = button.parentNode.parentNode; // Get the row to edit
    document.getElementById("name").value = currentRow.cells[1].innerHTML; // Set Nama
    document.getElementById("nip").value = currentRow.cells[2].innerHTML; // Set NIP
    document.getElementById("jam").value = currentRow.cells[3].innerHTML; // Set Bukti Photo

    isEditing = true; // Set editing flag
    modal.style.display = "block"; // Open modal for editing
}

// ⬤