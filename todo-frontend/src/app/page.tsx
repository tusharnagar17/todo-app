import TodoContainer from "@/components/TodoContainer";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className="md:flex  h-[100vh]
         bg-gradient-to-br from-violet-500   to-blue-500
        justify-center px-4 pt-20"
    >
      <div className="overflow-y-auto max-h-[90vh]">
        <TodoContainer />
      </div>
    </main>
  );
}
