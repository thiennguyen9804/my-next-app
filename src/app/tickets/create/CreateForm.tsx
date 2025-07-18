"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation";



export default function CreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('low');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const ticket: AddTicket = {
      title, body, priority, user_email: 'mario@netninja.dev'
    }

    const res = await fetch('http://localhost:4000/tickets', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(ticket)
    });

    if (res.status === 201) {
      router.push('/tickets');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          className="bg-white"
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Title:</span>
        <textarea
          className="bg-white"
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          className="bg-white"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}

        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  )
}

