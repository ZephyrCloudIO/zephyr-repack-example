import React, {createContext, useContext} from 'react';

const VersionContext = createContext<string>('Untouched');

export const useVersion = (): string => {
  const context = useContext<string>(VersionContext);
  if (!context) {
    throw new Error('useVersion must be used within an VersionProvider');
  }
  return context;
};

type VersionProviderProps = {
  children: React.ReactNode;
  currentVersion: string;
};

export const VersionProvider: React.FC<VersionProviderProps> = ({
  children,
  currentVersion,
}) => {
  return (
    <VersionContext.Provider value={currentVersion}>
      {children}
    </VersionContext.Provider>
  );
};
