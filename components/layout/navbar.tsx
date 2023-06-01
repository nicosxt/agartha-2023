
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";

import style from './navbar.module.css'
import Agartha from "../svgs/agartha";


const items: MenuProps["items"] = [
    {
      label: (
        <a href="https://discord.gg/UAjzAx62Ug">
          <p className="font-mono pr-4">Discord</p>
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="https://twitter.com/agartha_one">
          <p className="font-mono pr-4">Twitter</p>
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a href="https://www.instagram.com/agartha_one/">
          <p className="font-mono pr-4">Instagram</p>
        </a>
      ),
      key: "2",
    },
  ];

export default function Navbar(props) {
  return (
    <nav className={`${style.navbar} ${props.darkMode ? style.navbarDark : ''}`} aria-label="Global">
      <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/">
            <span className="sr-only">Agartha</span>
            <Agartha dark={props.darkMode} />
          </Link>
        </div>
      </div>

      <div className="text-xs sm:text-sm mr-4 items-center flex justify-end sm:flex md:flex md:flex-1 lg:w-0 ">
        <Link href={"/map"} style={{ cursor: "pointer" }}>
          <p className="font-mono  pr-3 sm:pr-8">Home</p>
        </Link>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://agarthamap.notion.site/agarthamap/Agartha-913b57d888d44b86accabd9a75bd6a05"
        >
          <p className="font-mono  pr-3 sm:pr-8">About</p>
        </a>
        <Dropdown menu={{ items }} trigger={["click"]} arrow={false}>
          <a style={{ cursor: "pointer" }} onClick={(e) => e.preventDefault()}>
            <p className="font-mono pr-4">Connect+</p>
          </a>
        </Dropdown>
      </div>
    </nav>
  );
}
