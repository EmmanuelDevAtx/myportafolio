import { dark_theme } from "@/theme/dark";
import { ligth_theme } from "@/theme/light";
import { settingsStorage } from "@/utils/storage";
import { ThemeProvider } from "@emotion/react";
import { createContext, useContext, useEffect, useState } from "react";

type SettingsData = {
  isDarkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  height: number;
  width: number;
  isSmallScreen: boolean;
};

const SettingsContext = createContext<SettingsData>({
  isDarkMode: true,
  setDarkMode: () => {},
  height: 0,
  width: 0,
  isSmallScreen: false
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [height, setScreenHeight] = useState<number>(0);
  const [width, setScreenWidth] = useState<number>(0);

  const isSmallScreen = width < 650;

  useEffect(() => {
    const settingsData = async () => {
      const settingsDataStorage = await settingsStorage.getData();

      const isDarkModeStorageData = settingsDataStorage?.isDarkMode ?? true;
      setIsDarkMode(isDarkModeStorageData);
    };
    settingsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function setDarkMode(mode: boolean) {
    const settingsDataStorage = await settingsStorage.getData();
    settingsStorage.setData({ ...settingsDataStorage, isDarkMode: mode });
  }

  return (
    <SettingsContext.Provider value={{ isDarkMode, setDarkMode, width, height, isSmallScreen }}>
      <ThemeProvider theme={isDarkMode ? dark_theme : ligth_theme}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
