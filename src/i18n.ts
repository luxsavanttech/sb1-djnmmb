import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to HealthBridge',
          tagline: 'Connecting Communities to Care',
          findDoctor: 'Find a Doctor',
          emergency: 'Emergency',
          symptoms: 'Check Symptoms',
          appointments: 'My Appointments',
          language: 'Language',
          settings: 'Settings',
        },
      },
      es: {
        translation: {
          welcome: 'Bienvenido a HealthBridge',
          tagline: 'Conectando Comunidades con el Cuidado',
          findDoctor: 'Encontrar un Médico',
          emergency: 'Emergencia',
          symptoms: 'Verificar Síntomas',
          appointments: 'Mis Citas',
          language: 'Idioma',
          settings: 'Configuración',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;