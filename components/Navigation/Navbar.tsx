"use client";
import HamburgerIcon from "@/assets/Logos/Hamburger.png";
import { navbarItems } from "@/utils/navItems";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TextButton from "../Buttons/TextButton";
import MyImage from "../MyImage";
import { useGroupStore } from "@/stores/group-store";
import DataSelector from "./DataSelector";

const NavBar = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDataSelectorOpen, setIsDataSelectorOpen] = useState(false);

  const { selectedGroup } = useGroupStore();

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDataSelectorOpen(false);
  }, [selectedGroup]);

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
    <nav className="flex flex-col items-center bg-primary-800 text-white justify-evenly py-5 gap-5 2xl:flex-row">
      <div className="flex flex-col justify-center items-center">
        <div
          className="flex flex-col hover:cursor-pointer"
          onClick={() => setIsDataSelectorOpen((oldValue) => !oldValue)}
        >
          {selectedGroup?.StatGroupName ?? "Ei valittua sarjaa"}
        </div>
        <div className={`py-5 ${!isDataSelectorOpen ? "hidden" : ""}`}>
          <DataSelector />
        </div>
      </div>
      <div className="hidden flex-row justify-between items-center text-lg gap-[3rem] mx-[6rem] 2xl:flex">
        {navItems}
      </div>
      <div className="flex justify-center px-5 2xl:hidden hover:cursor-pointer">
        <MyImage
          alt="Hamburger menu"
          src={HamburgerIcon}
          width={40}
          onClick={() => setIsMenuOpen((oldValue) => !oldValue)}
        />
        {isMenuOpen && (
          <div className="flex flex-col bg-primary-600 gap-3 p-4 mt-10 rounded-md absolute shadow-md 2xl:hidden">
            {navItems}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
