import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">We Hit a Brick Wall.</h2>
      <p>We could not find the ticket you were loolking for.</p>
      <p>Go back to the <Link href="/tickets">tickets</Link></p>
    </main>
  )
}

