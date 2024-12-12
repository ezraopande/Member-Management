import { useSelector } from "react-redux";

const Footer = () => {
  const settings = useSelector((state) => state.settings.data);

  return (
    <div className="bg-white text-gray-600 text-sm p-4 text-center border-t">
      &copy; {new Date().getFullYear()} {settings.websiteName}. Powered by Ezra
      Opande
    </div>
  );
};

export default Footer;
