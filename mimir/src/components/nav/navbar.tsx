import PCContainer from "@/components/nav/pcContainer";

export default async function Navbar() {
  return (
    <nav className="bg-zinc-400 px-2 text-zinc-900 flex justify-between items-center">
      <h1 className="font-bold text-xl my-2">Mimir</h1>
      <PCContainer />
    </nav>
  );
}
