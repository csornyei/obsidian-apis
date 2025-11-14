import PCContainer from "@/components/nav/pcContainer";

export default async function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-zinc-200 px-2 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
      <h1 className="my-2 text-xl font-bold">MIMIR</h1>
      <PCContainer />
    </nav>
  );
}
