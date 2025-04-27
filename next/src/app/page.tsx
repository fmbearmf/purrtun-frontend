import Navbar from "@/components/navbar";
import { css } from "@/styled-system/css";

export default function Home() {
  return (
    <>
      <div className={css({ 
        fontSize: "3xl", 
        fontWeight: "bolder" 
      })}></div>
      <Navbar />
    </>
  );
}