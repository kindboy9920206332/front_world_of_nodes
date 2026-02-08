import { DarkLightToggleButton } from "@/components/ui/btns/darkLight";

export default function HomeGame() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-background text-text dark:bg-background-dark dark:text-text-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary dark:text-primary-dark">Welcome to the Home Game!</h1>
          <p className="text-lg mb-6 text-secondary dark:text-secondary-dark">This is where the adventure begins.</p>
          <DarkLightToggleButton />
        </div>
      </div>
    </>
  );
}
