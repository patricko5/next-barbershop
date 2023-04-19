import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Index from "..";
import GalleryTab from "../../../src/components/admin/GalleryTab";

const Gallery = () => {
  const router = useRouter();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const role = useSelector((state) => state.auth.role);

  if (!loggedIn || role !== "admin") {
    router.push("/Login");
  }

  return (
    <Index>
      <GalleryTab />
    </Index>
  );
};
export default Gallery;
