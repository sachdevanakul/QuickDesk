let tickets = [];
  let ticketId = 1;

  document.getElementById("ticketForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const subject = document.getElementById("subject").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const status = "Open";
    const createdAt = new Date().toISOString();

    const ticket = {
      id: ticketId++,
      subject,
      description,
      category,
      status,
      comments: [],
      createdAt
    };
    tickets.push(ticket);
    document.getElementById("ticketForm").reset();
    showTab('myTickets', e);
    renderTickets();
  });

  function showTab(tabId, e) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll("aside li").forEach(li => li.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    if (e) e.target.classList.add("active");

    if (tabId === "statusTab") renderStatusSections();
  }

  function addComment(ticketId, commentText) {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket && commentText) {
      ticket.comments.push(commentText);
      renderTickets();
      renderStatusSections();
    }
  }

  function renderTickets() {
    const container = document.getElementById("ticketsContainer");
    const search = document.getElementById("searchInput").value.toLowerCase();
    const status = document.getElementById("statusFilter").value;
    const category = document.getElementById("categoryFilter").value;

    container.innerHTML = "";
    tickets
      .filter(ticket =>
        ticket.subject.toLowerCase().includes(search) &&
        (status === "" || ticket.status === status) &&
        (category === "" || ticket.category === category)
      )
      .forEach(ticket => container.appendChild(renderTicketCard(ticket)));
  }

  function renderStatusSections() {
    const container = document.getElementById("statusSections");
    container.innerHTML = "";

    const statuses = ["Open", "In Progress", "Resolved", "Closed"];
    statuses.forEach(status => {
      const section = document.createElement("div");
      section.className = "status-section";
      section.innerHTML = `<h3>${status} Tickets</h3>`;
      tickets.filter(t => t.status === status)
        .forEach(t => section.appendChild(renderTicketCard(t)));
      container.appendChild(section);
    });
  }

  function renderTicketCard(ticket) {
    const card = document.createElement("div");
    card.className = "ticket-card";
    card.innerHTML = `
      <h3>${ticket.subject}</h3>
      <p>${ticket.description}</p>
      <p><strong>Category:</strong> ${ticket.category}</p>
      <p><strong>Status:</strong> ${ticket.status}</p>
      <p><strong>Replies:</strong> ${ticket.comments.length}</p>
      <div class="thread">
        ${ticket.comments.map(c => `<p>- ${c}</p>`).join("")}
      </div>
      <div class="comment-box">
        <input type="text" placeholder="Reply..." onkeydown="if(event.key==='Enter'){ addComment(${ticket.id}, this.value); this.value=''; }" />
      </div>
    `;
    return card;
  }

    function changePassword(event) {
    event.preventDefault();
    const current = document.getElementById("currentPassword").value;
    const newPass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    const message = document.getElementById("passwordMessage");

    if (newPass !== confirm) {
      message.style.color = "red";
      message.textContent = "New passwords do not match.";
    } else if (newPass.length < 6) {
      message.style.color = "red";
      message.textContent = "Password must be at least 6 characters.";
    } else {
      // Simulate success (replace with actual backend call)
      message.style.color = "green";
      message.textContent = "Password changed successfully.";
    }

    document.getElementById("changePasswordForm").reset();
  }