const tickets = [
  {
    id: 1,
    title: "Login issue",
    description: "User cannot log in with valid credentials.",
    status: "open",
    assignedTo: null,
  },
  {
    id: 2,
    title: "Bug Report",
    description: "Monthly report fails with 500 error.",
    status: "in-progress",
    assignedTo: "Agent",
  },
  {
    id: 3,
    title: "Payment Issue",
    description: "User is unable to make payments.",
    status: "open",
    assignedTo: null,
  },
  {
    id: 4,
    title: "UI Error",
    description: "The UI is not responsive on mobile devices.",
    status: "resolved",
    assignedTo: "Agent",
  },
];

const container = document.getElementById("ticketsContainer");
const filter = document.getElementById("statusFilter");

function renderTickets(filteredList) {
  container.innerHTML = "";

  if (filteredList.length === 0) {
    container.innerHTML = "<p>No tickets found.</p>";
    return;
  }

  filteredList.forEach((ticket) => {
    const div = document.createElement("div");
    div.classList.add("ticket");

    // Status tag color
    let statusClass = "status-open";
    if (ticket.status === "in-progress") statusClass = "status-in-progress";
    if (ticket.status === "resolved") statusClass = "status-resolved";

    div.innerHTML = `
      <span class="status-tag ${statusClass}">${ticket.status.toUpperCase()}</span>
      <h3>${ticket.title}</h3>
      <div class="assigned">Assigned To: <strong>${ticket.assignedTo || "Unassigned"}</strong></div>
      <p>${ticket.description}</p>

      ${!ticket.assignedTo ? `<button onclick="assign(${ticket.id})">Assign to Me</button>` : ""}
      ${ticket.assignedTo === "Agent" ? `
        <button onclick="updateStatus(${ticket.id}, 'in-progress')">Mark In Progress</button>
        <button onclick="updateStatus(${ticket.id}, 'resolved')">Mark Resolved</button>
      ` : ""}
    `;

    container.appendChild(div);
  });
}

// Initial render
renderTickets(tickets);

// Filter handler
filter.addEventListener("change", () => {
  const value = filter.value;

  if (value === "all") {
    renderTickets(tickets);
  } else {
    const filtered = tickets.filter((t) => t.status === value);
    renderTickets(filtered);
  }
});

// Dummy functions
function assign(id) {
  alert(`Ticket ${id} assigned to you.`);
}

function updateStatus(id, status) {
  alert(`Ticket ${id} marked as ${status}.`);
}
