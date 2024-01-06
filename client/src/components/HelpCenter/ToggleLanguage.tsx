import * as React from "react";
import { Button, Stack } from "@mui/material";
import { changeLanguage, i18n } from "i18next";

// This component is placed on all 6 help cards for language switching
export default function ToggleLanguage() {
  const [language, setLanguage] = React.useState("en");
  //   const {i18n} = useTranslation();
  const handleButtonClick = (e: any) => {
    const selectedValue = e.target.value;
    setLanguage(selectedValue);
  };
  React.useEffect(() => {
    changeLanguage(language);
  }, [language]);
  return (
    <div>
      <Button value="fr" onClick={handleButtonClick}>
        French
      </Button>
      <Button value="en" onClick={handleButtonClick}>
        English
      </Button>
      <Button value="es" onClick={handleButtonClick}>
        Spanish
      </Button>
    </div>
  );
}
