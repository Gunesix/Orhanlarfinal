import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  settings: any;
  loading: boolean;
}

const defaultSettings = {
  contactInfo: {
    phone: "0535 776 09 94",
    whatsapp: "905357760994",
    email: "Orhanlarhafriyat@gmail.com",
    address: "Merkez Mah. Turgut Reis 10. Sk. No:1 Dalaman, Muğla"
  }
};

const SettingsContext = createContext<SettingsContextType>({ settings: defaultSettings, loading: false });

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings] = useState<any>(defaultSettings);
  const [loading] = useState(false);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};
