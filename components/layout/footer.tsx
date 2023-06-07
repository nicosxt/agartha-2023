import Link from "next/link";
export default function Footer(props: any) {
  return (
    <footer className="p-4 mt-8 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 lg:flex lg:items-center lg:justify-between lg:p-6 ">
      <span className="text-sm text-gray-500 sm:text-center ">
        © 2022{" "}
        <a href="https://flowbite.com" className="hover:underline">
          Space Exchange
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500  sm:mt-0">
        <li>
          <Link href={`/getstarted`} className="mr-4 hover:underline md:mr-6 ">
            Get Started
          </Link>
        </li>
        {/* <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Mirror Blog</a>
            </li> */}
        {/* <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
                <a href="#" className="hover:underline">Contact</a>
            </li> */}
      </ul>
    </footer>
  );
}
