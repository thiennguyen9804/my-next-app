import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Params = {
  params: { id: string }
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets');
  const tickets: Ticket[] = await res.json();
  return tickets.map((ticket) => ({
    id: ticket.id
  }));
}

async function getTicket(id: string): Promise<Ticket> {

  await new Promise(resolve => setTimeout(resolve, 3000));
  const res = await fetch('http://localhost:4000/tickets/' + id, {
    next: {
      revalidate: 30
    }
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function TicketDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

