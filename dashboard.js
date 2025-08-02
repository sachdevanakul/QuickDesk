const isLoggedIn = localStorage.getItem("agentLoggedIn");
if (!isLoggedIn) {
  window.location.href = "index.html";
}

// fake ticket data
const tickets = [
  { id: 1, title: "Login issue", status: "open", assignedTo: null },
  { id: 2, title: "Bug in report", status: "in-progress", assignedTo: "Agent" },
  { id: 3, title: "Data not saving", status: "open", assignedTo: null },
];

const container = document.getElementById("ticketsContainer");

tickets.forEach((ticket) => {
  const div = document.createElement("div");
  div.style.border = "1px solid #ccc";
  div.style.marginBottom = "10px";
  div.style.padding = "10px";

  div.innerHTML = `
    <strong>${ticket.title}</strong><br/>
    <small>Status: ${ticket.status}</small><br/>
    <small>Assigned To: ${ticket.assignedTo || "Unassigned"}</small><br/><br/>
    ${!ticket.assignedTo ? `<button onclick="assignTicket(${ticket.id})">Assign to Me</button>` : ""}
    ${ticket.assignedTo === "Agent" ? `
      <button onclick="updateStatus(${ticket.id}, 'in-progress')">In Progress</button>
      <button onclick="updateStatus(${ticket.id}, 'resolved')">Resolve</button>
    ` : ""}
  `;
  container.appendChild(div);
});

function assignTicket(id) {
  alert(`Ticket ${id} assigned to you.`);
}

function updateStatus(id, status) {
  alert(`Ticket ${id} marked as ${status}.`);
}
