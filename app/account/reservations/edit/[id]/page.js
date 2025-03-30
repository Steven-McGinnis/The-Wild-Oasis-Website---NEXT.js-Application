import UpdateReservationFormButton from "@/app/_components/UpdateReservationButton";
import { updateReservation } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const session = await auth();
  const { id } = await params;
  const bookingId = Number(id);

  const bookings = await getBookings(session.user.guestId);

  // If the booking is not in the users bookings, throw an error
  if (!bookings.map((booking) => booking.id).includes(bookingId)) {
    throw new Error("You are not authorized to edit this booking.");
  }

  const booking = await getBooking(bookingId);
  const cabin = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Edit Reservation #{booking.id}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={booking.numGuests}
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={booking.observations}
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          />
        </div>

        <input type="hidden" name="bookingId" value={bookingId} />

        <div className="flex items-center justify-end gap-6">
          <UpdateReservationFormButton />
        </div>
      </form>
    </div>
  );
}
