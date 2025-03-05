import React, {createContext, useContext} from 'react';

const OtaContext = createContext<string>('Untouched');

export const useOtaVersion = (): string => {
  const context = useContext<string>(OtaContext);
  if (!context) {
    throw new Error('useOta must be used within an OtaProvider');
  }
  return context;
};

type OtaProviderProps = {
  children: React.ReactNode;
  currentVersion: string;
};

export const OtaProvider: React.FC<OtaProviderProps> = ({
  children,
  currentVersion,
}) => {
  return (
    <OtaContext.Provider value={currentVersion}>{children}</OtaContext.Provider>
  );
};
