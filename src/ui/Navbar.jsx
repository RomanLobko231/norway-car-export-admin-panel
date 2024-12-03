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
                </div>
              </div>
              <Link
                className="group my-1 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
                to="/add-new"
              >
                <img
                  src="../icons/add.png"
                  className="mr-2 block h-5 w-auto group-hover:hidden"
                />
                <img
                  src="../icons/add_light.png"
                  className="mr-3 hidden h-4 w-auto group-hover:block"
                />
                Add New
              </Link>
            </div>
            <div className="flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-medium-gray hover:text-gunmental">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <img
                  src="../icons/menu.png"
                  aria-hidden="true"
                  className="block h-6 w-8 group-data-[open]:hidden"
                />
                <img
                  src="../icons/close.png"
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="w-full space-y-6 px-2 pb-9 pt-8">
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

            <button className="group my-1 flex flex-row items-center rounded-lg border border-medium-gray bg-distant-cloud px-3 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse">
              <img
                src="../icons/add.png"
                className="mr-2 block h-5 w-auto group-hover:hidden"
              />
              <img
                src="../icons/add_light.png"
                className="mr-3 hidden h-4 w-auto group-hover:block"
              />
              Add New
            </button>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
