type Props = {
  params: { id: string }
}


async function getTicket(id: string): Promise<Ticket> {
  const res = await fetch('http://localhost:4000/tickets' + id, {
    next: {
      revalidate: 30
    }
  });
  return res.json();
}

export default async function TicketDetails({ params }: Props) {
  const id = params.id;
  const ticket = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>TicketDetails</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}

