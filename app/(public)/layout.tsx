import Footer from "@/components/Footer";
import Header from "@/components/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
