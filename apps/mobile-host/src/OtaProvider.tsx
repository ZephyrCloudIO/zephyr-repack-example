import React, {createContext, useContext} from 'react';

type OtaContextType = {
  currentVersion: string;
};

const OtaContext = createContext<OtaContextType>({
  currentVersion: '1.0.0', // Default version
});

export const useOta = () => {
  const context = useContext(OtaContext);
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
    <OtaContext.Provider value={{currentVersion}}>
      {children}
    </OtaContext.Provider>
  );
};
