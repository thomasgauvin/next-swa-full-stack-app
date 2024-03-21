"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const paths = [
    { name: "Home", url: "/"},
    { name: "Items", url: "/items" },
    { name: "Sales", url: "/sales" }
  ];
  const pathname = usePathname();
  return (
    <>
      <div className="bg-white px-4 py-[0.65rem]">
        <div className="container mx-auto">
          <div className="text-gray-800 text-2xl font-bold">Contoso</div>
        </div>
      </div>
      <nav>
        {paths.map((path, index) => (
          <div key={index} >
              <Link
                href={path.url}
                className={pathname.includes(path.url) && path.url !== '/' || (path.url === '/' && pathname === '/') ? "text-lg font-semibold mb-4 bg-gray-100" : "text-lg mb-4 hover:bg-gray-50"}
                >
                <div className="py-2 px-4 m-2 rounded-md bg-inherit ">
                  {path.name}
                </div>
              </Link>
          </div>
        ))
        }
      </nav>
    </>
  );
};

export default Navbar;
