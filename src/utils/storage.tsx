class MyStorage<T> {
  private readonly storageKey: string;

  constructor(key: string) {
    this.storageKey = key;
  }

  getData (): T | null{
    if(typeof window !== "undefined"){
        const currentData = localStorage.getItem(this.storageKey);
        return currentData ? JSON.parse(currentData) : null;
    }
    return null;
  }

  setData (data: T): void{
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  removeData (): void{
    localStorage.removeItem(this.storageKey);
  }
}

export interface SettingsStorageInterface {
    isDarkMode?: boolean;
    lang?: string;
}


export const settingsStorage = new MyStorage<SettingsStorageInterface>('SettingsStorageInterface');
