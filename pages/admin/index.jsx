import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import { TiBusinessCard } from "react-icons/ti";
import { BsShop } from "react-icons/bs";
import { VscCalendar } from "react-icons/vsc";
import { ImScissors } from "react-icons/im";
import { TfiGallery } from "react-icons/Tfi";
import { useEffect } from "react";

const Index = ({ children }) => {
  const router = useRouter();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const role = useSelector((state) => state.auth.role);

  if (!loggedIn && role !== "admin") {
    router.push("/Login");
  }

  useEffect(() => {
    if (router.pathname === "/admin") {
      router.replace("/admin/staff");
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.tabMenu}>
          <Link href="/admin/staff">
            <div className={styles.tabButtonContainer}>
              <div className={styles.tabButton}>
                <TiBusinessCard size={30} />
                <a>Staff</a>
              </div>
            </div>
          </Link>
          <Link href="/admin/shop">
            <div className={styles.tabButtonContainer}>
              <div className={styles.tabButton}>
                <BsShop size={30} />
                <a>Shop</a>
              </div>
            </div>
          </Link>
          <Link href="/admin/booking">
            <div className={styles.tabButtonContainer}>
              <div className={styles.tabButton}> 
                <VscCalendar size={30} />
                <a>Booking</a>
              </div>
            </div>
          </Link>
          <Link href="/admin/services">
            <div className={styles.tabButtonContainer}>
              <div className={styles.tabButton}>
                <ImScissors size={30} />
                <a>Services</a>
              </div>
            </div>
          </Link>
          <Link href="/admin/gallery">
            <div className={styles.tabButtonContainer}>
              <div className={styles.tabButton}>
                <TfiGallery size={30} />
                <a>Gallery</a>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.item}>{children}</div>
    </div>
  );
};

export default Index;
