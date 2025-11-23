import HomePageClient from "@/components/pages/HomePageClient";
import Background from "@/components/ui/background";

export default function Home() {
  return (
    <Background>
      <div className="flex items-center justify-center min-h-screen cursor-default select-none w-full p-4">
        <HomePageClient />
      </div>
    </Background>
  );
}
