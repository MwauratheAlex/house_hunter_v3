import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  return (
    <div>
      <div className="border-b">
        <Container>
          <div className="flex justify-between py-4">
            <Logo />
            <Toaster position="top-center" reverseOrder={false} />

            <UserMenu />
          </div>
        </Container>
      </div>
      {/* <div className="border-b">
        <Container>
          <div className="flex justify-between py-4"><Search /></div>
        </Container>
      </div> */}
    </div>
  );
};

export default Navbar;
