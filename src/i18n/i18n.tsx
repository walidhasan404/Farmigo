import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      home: "Home",
      products: "Products",
      blogs: "Blogs",
      weather: "Weather",
      login: "Login",
    },
  },
  bn: {
    translation: {
      welcome: "স্বাগতম",
      home: "হোম",
      products: "পণ্য",
      blogs: "ব্লগ",
      weather: "আবহাওয়া",
      login: "লগ ইন",
    },
  },
};

i18n
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next)  // Passes i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'en',  // Default language
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;
