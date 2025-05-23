import { isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "@/app/_lib/helpers"; // adjust path if needed
import supabase from "@/app/_services/supabase";
import { bookings } from "@/app/_data/data-bookings";
import { cabins } from "@/app/_data/data-cabins";
import { guests } from "@/app/_data/data-guests";

// --- Delete functions ---
async function deleteGuests() {
  return await supabase.from("guests").delete().gt("id", 0);
}
async function deleteCabins() {
  return await supabase.from("cabins").delete().gt("id", 0);
}
async function deleteBookings() {
  return await supabase.from("bookings").delete().gt("id", 0);
}

// --- Create functions ---
async function createGuests() {
  return await supabase.from("guests").insert(guests);
}
async function createCabins() {
  return await supabase.from("cabins").insert(cabins);
}
async function createBookings() {
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    else if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    else status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: guestsIds.at(booking.guestId - 1).id,
      cabinId: cabinsIds.at(booking.cabinId - 1).id,
      status,
    };
  });

  return await supabase.from("bookings").insert(finalBookings);
}

export async function POST() {
  try {
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();
    await createGuests();
    await createCabins();
    await createBookings();

    return Response.json({ message: "Data refreshed" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: err.message || "Failed to refresh" },
      { status: 500 },
    );
  }
}
