import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image src={logo} height="60" width="60" alt="The Wild Oasis logo" />
      <span className="text-primary-100 text-xl font-semibold">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
