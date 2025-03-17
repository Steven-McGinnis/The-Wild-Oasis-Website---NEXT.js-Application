import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }) {
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  return (
    <div className="border-primary-800 grid min-h-[100px] grid-cols-[auto_auto] border">
      <DateSelector settings={settings} />
      <ReservationForm bookedDates={bookedDates} cabin={cabin} />
    </div>
  );
}
