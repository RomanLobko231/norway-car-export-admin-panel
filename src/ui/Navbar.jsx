import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { TbMenu } from "react-icons/tb";
import { MdOutlineAddBox, MdOutlineClose } from "react-icons/md";

const navigation = [
  { name: "In Review", href: "/", current: false },
  { name: "Auctioning", href: "/", current: false },
  { name: "Sold", href: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <div className="fixed z-10 flex w-full justify-center">
      <Disclosure
        as="nav"
        className="mx-4 my-3 flex w-full max-w-7xl flex-col items-center justify-center rounded-lg border border-medium-gray bg-lighthouse/50 backdrop-blur"
      >
        <div className="w-full max-w-7xl px-6 py-1 lg:px-8">
          <div className="flex h-12 flex-row items-center justify-between md:h-14">
            <div className="flex flex-1 items-center justify-between sm:items-stretch">
              <div className="hidden py-1 sm:block">
                <div className="flex space-x-3">
                  <Link
                    className="rounded-lg px-3 py-2 pb-2 pt-1 text-2xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:mr-2"
                    to="/"
                  >
                    {" "}
                    Main Page
                  </Link>
                  <Menu>
                    <MenuButton className="group flex flex-row items-center justify-center rounded-lg px-3 py-2 pb-2 pt-1 text-2xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse">
                      Cars
                      <img
                        src="../icons/arrow_down_dark.png"
                        className="ml-2 mt-1 block h-2 w-auto group-hover:hidden"
                      />
                      <img
                        src="../icons/arrow_down_light.png"
                        className="ml-2 mt-1 hidden h-2 w-auto group-hover:block"
                      />{" "}
                    </MenuButton>
                    <MenuItems
                      className="mt-4 rounded-md border border-light-gray bg-lighthouse p-2"
                      anchor="bottom"
                    >
                      <MenuItem>
                        <Link
                          className="block rounded-lg p-2 text-xl font-medium text-gunmental hover:bg-gunmental hover:text-lighthouse"
                          to="/cars?status=in-review"
                        >
                          {" "}
                          In Review
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          className="block rounded-lg p-2 text-xl font-medium text-gunmental hover:bg-gunmental hover:text-lighthouse"
                          to="/cars?status=auctioning"
                        >
                          {" "}
                          Auctioning
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          className="block rounded-lg p-2 text-xl font-medium text-gunmental hover:bg-gunmental hover:text-lighthouse"
                          to="/cars?status=sold"
                        >
                          {" "}
                          Sold
                        </Link>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                  <Link
                    className="rounded-lg px-3 py-2 pb-2 pt-1 text-2xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:mr-2"
                    to="/buyers"
                  >
                    {" "}
                    Buyers
                  </Link>
                  <Link
                    className="rounded-lg px-3 py-2 pb-2 pt-1 text-2xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:mr-2"
                    to="/sellers"
                  >
                    {" "}
                    Sellers
                  </Link>
                </div>
              </div>
              <Link
                className="group my-1 hidden flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-1 pt-1 text-base font-normal text-gunmental hover:bg-gunmental hover:text-lighthouse sm:flex md:text-xl md:font-semibold"
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
                Add New
              </Link>
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
                className={classNames(
                  item.current
                    ? "bg-gunmental text-lighthouse"
                    : "text-gunmental hover:bg-gray-700 hover:text-lighthouse",
                  "block rounded-full px-4 pb-3 pt-2 text-center text-2xl font-semibold",
                )}
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
              Add New
            </Link>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
