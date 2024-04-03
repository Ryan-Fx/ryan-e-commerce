import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavbarShop from "@/components/navbar-shop";

export default function Shoplayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Navbar />
        <NavbarShop />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
