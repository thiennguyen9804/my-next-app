
type Ticket = {
  id: string,
  title: string,
  body: string,
  priority: string,
  user_email: string,
}

type AddTicket = Partial<Ticket>;

