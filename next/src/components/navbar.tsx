"use client";

import { styled } from "@/styled-system/jsx";
import { css } from "@/styled-system/css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const pages = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "join", path: "/join" },
];

const ulStyle = css({
    alignItems: "center",
    display: "flex",
    "& li": {
        display: "list-item",
        textAlign: "-webkit-match-parent",
        unicodeBidi: "isolate"
    },
    "& li a": {
        //color: "inherit",
        padding: "10px",
        transition: "all .22s",
        display: "inline-block",
        "&:hover": {
            color: "accent",
        },
        "&:active": {
            color: "accent"
        }
    }
});

export default function Navbar() {
    const pathname = usePathname();
    return (
        <styled.header 
            zIndex={"7000000"} 
            width={"100%"}
            maxWidth={"max-content"}
            borderRadius={"20px"}
            position={"fixed"}
            top={"0"}
            left={"50%"}
            letterSpacing={"-0.4px"}
            padding={"20px 0"}
            fontSize={"1.25rem"}
            fontStyle={"normal"}
            fontWeight={"400"}
            lineHeight={"0.8"}
            transform={"translate3d(-50%, 24px, .1px)"}
        >
            <styled.div 
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0 20px"}
                display={"flex"}
                marginLeft={"auto"}
                marginRight={"auto"}
            >
                <nav>
                    <ul className={ulStyle}>
                        {pages.map((link) => {
                            const isActive = pathname === link.path;
                            console.log(`the link is: ${link.name}. this is: ${isActive}`)

                            return (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className={css({
                                            color: isActive ? "secondary" : "text"
                                        })}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </styled.div>
        </styled.header>
    )
}