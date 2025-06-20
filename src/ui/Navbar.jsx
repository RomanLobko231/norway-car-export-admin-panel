import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbCar, TbHome, TbMenu } from "react-icons/tb";
import {
  MdHome,
  MdOutlineAddBox,
  MdOutlineClose,
  MdOutlinePerson2,
} from "react-icons/md";
import { useState } from "react";
import LoginModal from "./security/LoginModal";
import { RiAuctionLine } from "react-icons/ri";

const navigation = [
  { name: "Hjem", href: "/", current: false, icon: <TbHome /> },
  { name: "Biler", href: "/cars", current: false, icon: <TbCar /> },
  {
    name: "Buyere",
    href: "/buyers",
    current: false,
    icon: <MdOutlinePerson2 />,
  },
  {
    name: "Auksjon",
    href: "/auctions",
    current: false,
    icon: <RiAuctionLine />,
  },
];

export default function Navbar() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const token = sessionStorage.getItem("token");

  return (
    <div className="fixed z-20 flex w-full justify-center">
      <Disclosure
        as="nav"
        className="mx-4 my-3 flex w-full max-w-7xl flex-col items-center justify-center rounded-lg border border-medium-gray bg-lighthouse/50 backdrop-blur"
      >
        <div className="w-full max-w-7xl px-6">
          <div className="flex h-12 flex-row items-center justify-between md:h-14">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-between">
              <div className="hidden flex-row items-center py-1 sm:flex">
                <span className="mr-4 hidden bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-xl font-black text-transparent md:inline-block">
                  ADMIN
                </span>
                <div className="flex">
                  {navigation.map((item) => (
                    <Link
                      className={`flex flex-row items-center gap-1 rounded-md border border-medium-gray px-4 pb-1 pt-1 text-xl font-semibold text-gunmental ${location.pathname == item.href && "bg-gunmental text-lighthouse"} hover:bg-gunmental hover:text-lighthouse md:mr-2`}
                      to={item.href}
                      key={item.href}
                    >
                      {item.icon} {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <Link
                  className="group my-1 hidden flex-row items-center rounded-md border border-medium-gray bg-lighthouse p-1 text-base font-normal text-gunmental hover:bg-gunmental hover:text-lighthouse sm:flex md:text-xl md:font-semibold"
                  to="/add-new"
                >
                  <MdOutlineAddBox className="h-7 w-auto" />
                  <p className="mx-2 hidden text-lg font-normal text-lighthouse group-hover:block md:text-xl md:font-semibold">
                    Legg til bil
                  </p>
                </Link>
                {token ? (
                  <div
                    className="my-1 hidden cursor-pointer flex-row items-center rounded-md border border-medium-gray bg-lighthouse px-3 pb-1 pt-1 text-base font-normal text-gunmental hover:bg-gunmental hover:text-lighthouse sm:flex md:text-xl md:font-semibold"
                    onClick={() => {
                      sessionStorage.removeItem("token");
                      sessionStorage.removeItem("role");
                      window.location.href = "/";
                    }}
                  >
                    Logg ut
                  </div>
                ) : (
                  <div
                    className="my-1 hidden cursor-pointer flex-row items-center rounded-md border border-medium-gray bg-lighthouse px-3 pb-1 pt-1 text-base font-normal text-gunmental hover:bg-gunmental hover:text-lighthouse sm:flex md:text-xl md:font-semibold"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Logg inn
                  </div>
                )}
              </div>

              <Link className="sm:hidden" to="/">
                <img
                  alt="NCE logo"
                  src="./nce_logo.png"
                  className="mr-2 h-7 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-medium-gray hover:text-gunmental">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <TbMenu className="block h-6 w-auto group-data-[open]:hidden" />
                <MdOutlineClose className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="flex w-full flex-col items-center space-y-6 px-2 pb-9 pt-8">
            {navigation.map((item, index) => (
              <DisclosureButton
                key={index}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={`${
                  location.pathname === item.href
                    ? "bg-gunmental text-lighthouse"
                    : "text-gunmental hover:bg-gunmental hover:text-lighthouse"
                } , "block rounded-lg px-4 pb-2 pt-1 text-center text-2xl font-semibold`}
              >
                {item.name}
              </DisclosureButton>
            ))}

            <Link
              className="group my-1 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-1 pt-1 text-base font-medium text-gunmental hover:bg-gunmental hover:text-lighthouse md:text-xl md:font-semibold"
              to="/add-new"
            >
              <MdOutlineAddBox
                className="mr-2 hidden h-7 w-auto group-hover:block"
                color="#F7F8F8"
              />
              <MdOutlineAddBox
                className="mr-2 block h-7 w-auto group-hover:hidden"
                color="#1c2628"
              />
              Legg til
            </Link>
            {token ? (
              <div
                className="my-1 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-1 pt-1 text-base font-medium text-gunmental hover:bg-gunmental hover:text-lighthouse md:text-xl md:font-semibold"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Logg ut
              </div>
            ) : (
              <div
                className="my-1 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-1 pt-1 text-base font-medium text-gunmental hover:bg-gunmental hover:text-lighthouse md:text-xl md:font-semibold"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Logg inn
              </div>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <LoginModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
}
