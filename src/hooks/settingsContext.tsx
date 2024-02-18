import { dark_theme } from "@/theme/dark";
import { ligth_theme } from "@/theme/light";
import { settingsStorage } from "@/utils/storage";
import { ThemeProvider } from "@emotion/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type SettingsData = {
  isDarkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  height: number;
  width: number;
  isSmallScreen: boolean;
  changeLanguage: () => void;
  isSpanish:boolean;
};

const SettingsContext = createContext<SettingsData>({
  isDarkMode: true,
  setDarkMode: () => {},
  height: 0,
  width: 0,
  isSmallScreen: false,
  changeLanguage: () => {},
  isSpanish: false
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [height, setScreenHeight] = useState<number>(0);
  const [width, setScreenWidth] = useState<number>(0);
  const [isSpanish, setIsSpanish] = useState<boolean>(true);
  const [isSmallScreen , setIsSmallScreen] = useState<boolean>(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const settingsData = async () => {
      const settingsDataStorage = await settingsStorage.getData();
      const isDarkModeStorageData = settingsDataStorage?.isDarkMode ?? true;
      setIsDarkMode(isDarkModeStorageData);

      const isSpanishMode = settingsDataStorage?.lang ?? 'es'
      setIsSpanish(isSpanishMode == 'es');
      i18n.changeLanguage(isSpanishMode);
    };
    settingsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
      setIsSmallScreen(window.innerWidth < 650);
    };
    
    window.addEventListener("resize", handleResize);
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
    setIsSmallScreen(window.innerWidth < 650);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function setDarkMode(mode: boolean) {
    const settingsDataStorage = await settingsStorage.getData();
    settingsStorage.setData({ ...settingsDataStorage, isDarkMode: mode });
    setIsDarkMode(mode);
  }

  async function changeLanguage() {
    i18n.changeLanguage(isSpanish ? 'en': 'es');
    
    const settingsDataStorage = await settingsStorage.getData();
    settingsStorage.setData({ ...settingsDataStorage, lang: isSpanish ? 'en': 'es' });
    setIsSpanish(i18n.language == 'es');
  }
  return (
    <SettingsContext.Provider
      value={{
        isDarkMode,
        setDarkMode,
        width,
        height,
        isSmallScreen,
        changeLanguage,
        isSpanish
      }}
    >
      <ThemeProvider theme={isDarkMode ? dark_theme : ligth_theme}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
