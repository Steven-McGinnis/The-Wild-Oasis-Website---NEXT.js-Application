import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const session = await auth();
  const firsName = session?.user?.name?.split(" ")[0];

  return (
    <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
      Welcome, {firsName}
    </h2>
  );
}
