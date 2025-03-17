import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { cabinid } = resolvedParams;
  const cabin = await getCabin(cabinid);
  const { name } = cabin;

  return {
    title: `Cabin ${name}`,
    description: `Cabin ${name} in the Dolomites, Italy. Reserve today.`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinid: cabin.id.toString(),
  }));
}

export default async function Page({ params }) {
  const { cabinid } = await params;

  const cabin = await getCabin(cabinid);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <div>
        <Cabin cabin={cabin} />
        <h2 className="text-accent-400 mb-10 text-center text-5xl font-semibold">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
