"use client";
import HamburgerIcon from "@/assets/Logos/Hamburger.png";
import { navbarItems } from "@/utils/navItems";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TextButton from "../Buttons/TextButton";
import MyImage from "../MyImage";

const NavBar = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const match = navbarItems.find((item) => item.url === pathName);
    setSelectedPage(match?.text ?? "");
  }, [pathName]);

  const navItems = navbarItems.map((item) => (
    <TextButton
      key={item.text}
      value={item.text}
      isSelected={selectedPage === item.text}
      borderStyle="border-primary-white border-2"
      onClick={() => {
        router.push(item.url);
        setIsMenuOpen(false);
      }}
    />
  ));

  return (
    <div className="flex flex-col items-center bg-primary-800 text-white justify-evenly py-5 gap-5 2xl:flex-row">
      <div className="hidden flex-row justify-between items-center text-lg gap-[3rem] mx-[6rem] 2xl:flex">
        {navItems}
      </div>
      <div className="flex justify-center px-5 2xl:hidden">
        <MyImage
          alt="Hamburger menu"
          src={HamburgerIcon}
          width={40}
          onClick={() => setIsMenuOpen((oldValue) => !oldValue)}
        />
        {isMenuOpen && (
          <div className="flex flex-col bg-primary-600 gap-3 p-4 mt-10 rounded-md absolute 2xl:hidden">
            {navItems}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
