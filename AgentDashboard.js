import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AgentDashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTickets = async () => {
    try {
      const res = await axios.get("/tickets", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const assignToMe = async (ticketId) => {
    try {
      await axios.put(
        `/tickets/${ticketId}/assign`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage("Ticket assigned!");
      fetchTickets();
    } catch (err) {
      console.error(err);
      setMessage("Assignment failed.");
    }
  };

  const updateStatus = async (ticketId, status) => {
    try {
      await axios.put(
        `/tickets/${ticketId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage("Status updated!");
      fetchTickets();
    } catch (err) {
      console.error(err);
      setMessage("Status update failed.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Agent Dashboard</h2>
      {message && <p>{message}</p>}
      {tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>{ticket.title}</strong> <br />
            <small>Status: {ticket.status}</small> <br />
            <small>Assigned To: {ticket.assignedTo?.name || "Unassigned"}</small>
            <p>{ticket.description}</p>

            {ticket.status === "open" && !ticket.assignedTo && (
              <button onClick={() => assignToMe(ticket._id)}>Assign to Me</button>
            )}

            {ticket.assignedTo?._id === user.userId && (
              <>
                <button onClick={() => updateStatus(ticket._id, "in-progress")}>
                  Mark In-Progress
                </button>
                <button onClick={() => updateStatus(ticket._id, "resolved")}>
                  Mark Resolved
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AgentDashboard;
