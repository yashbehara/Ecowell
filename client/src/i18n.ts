import i18n from "i18next";
import {initReactI18next} from 'react-i18next';
import HttpAPI from 'i18next-http-backend';

// This funnction changes the configured language
const changeLanguage = (newLang:string) => {
  i18n.changeLanguage(newLang);
};


i18n.use(HttpAPI)
  .use(initReactI18next)
  .init({
    lng:'fr',
    fallbackLng:'en', 
    ns:['common'],
    backend:{
      loadPath:'/i18n/{{lng}}/{{ns}}.json',
    },
    debug: true,
    interpolation:{
      escapeValue:false
    }
  });

  export default {i18n,changeLanguage};