import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h2 className="text-center text-4xl font-bold">
        Oh no! How did you get here?
      </h2>
      <p className="text-center">
        <Link
          className="rounded-lg bg-amber-600 px-2 py-4 text-lg font-bold underline hover:bg-amber-400"
          href="/"
        >
          Let&apos;s go back to the main page!
        </Link>
      </p>
    </>
  );
}
