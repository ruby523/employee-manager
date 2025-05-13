// Load saved employees from localStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Show all employees when the page loads
window.onload = function () {
  displayEmployees();
};

function showAddForm() {
  document.getElementById("add-form").style.display = "block";
}

function hideAddForm() {
  document.getElementById("add-form").style.display = "none";
  clearForm();
}

function saveEmployee() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (name && phone && address) {
    employees.push({ name, phone, address });
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();
    hideAddForm();
  } else {
    alert("Please fill out all fields.");
  }
}

function displayEmployees() {
  const list = document.getElementById("employee-list");
  list.innerHTML = ""; // Clear previous content

  employees.forEach((emp, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${emp.name}</strong><br>
      Phone: ${emp.phone}<br>
      Address: ${emp.address}<br>
      <button onclick="editEmployee(${index})">Edit</button>
      <button onclick="deleteEmployee(${index})">Delete</button>
      <hr>
    `;
    list.appendChild(div);
  });
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  displayEmployees();
}

function editEmployee(index) {
  const emp = employees[index];
  document.getElementById("name").value = emp.name;
  document.getElementById("phone").value = emp.phone;
  document.getElementById("address").value = emp.address;

  showAddForm();

  // When saving, replace the existing one
  employees.splice(index, 1);
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
}