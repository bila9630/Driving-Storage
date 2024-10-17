import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { ModeToggle } from "@/components/dark-mode-toggle";

export default function Home() {
  return (
    <div>
      <main>
        <p>Hello World</p>
        <CalendarDateRangePicker />
        <p>Hello World</p>
        <p>Hello World</p>

        <ModeToggle />
      </main>
    </div>
  );
}
