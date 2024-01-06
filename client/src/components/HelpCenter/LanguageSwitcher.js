// LanguageSwitcher.js
import { useTranslation } from "react-i18next";
import { changeLanguage } from "./path-to-your-i18n-file";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (newLang) => {
    changeLanguage(newLang);
  };

  //language switcher for internationalization
  return (
    <div>
      <button onClick={() => handleLanguageChange("en")}>English</button>
      <button onClick={() => handleLanguageChange("fr")}>French</button>
      <button onClick={() => handleLanguageChange("es")}>French</button>
    </div>
  );
};

export default LanguageSwitcher;
