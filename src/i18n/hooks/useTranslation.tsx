import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageShift: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('bn')}>বাংলা</button>
    </div>
  );
};

export default LanguageShift;
