import { dark_theme } from "@/theme/dark";
import { ligth_theme } from "@/theme/light";
import { settingsStorage } from "@/utils/storage";
import { ThemeProvider } from "@emotion/react";
import { createContext, useContext, useEffect, useState } from "react";

type SettingsData = {
  isDarkMode: boolean;
  setDarkMode: (mode: boolean)=> void;
};

const SettingsContext = createContext<SettingsData>({
  isDarkMode: true,
  setDarkMode: ()=>{}
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(()=>{
    const settingsData = async()=>{
      const settingsDataStorage = await settingsStorage.getData();

      const isDarkModeStorageData = settingsDataStorage?.isDarkMode ?? true;
      setIsDarkMode(isDarkModeStorageData);

    };
    settingsData();
  }, []);

  async function setDarkMode (mode: boolean){
    const settingsDataStorage = await settingsStorage.getData();
    settingsStorage.setData({...settingsDataStorage, isDarkMode:mode})
  }

  return (
    <SettingsContext.Provider value={{ isDarkMode, setDarkMode }}>
      <ThemeProvider theme={isDarkMode ? dark_theme : ligth_theme}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
};

export const useSettings = ()=>{
  return useContext(SettingsContext);
}
