import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./HeaderMenu.module.scss";

const HeaderMenu = () => {
  const path = usePathname();

  return (
    <nav className={styles.menu}>
      <Link
        href="/home"
        className={`${styles.link} ${path === "/" ? styles.active : ""}`}
      >
        Home
      </Link>
    </nav>
  );
};

export default HeaderMenu;
