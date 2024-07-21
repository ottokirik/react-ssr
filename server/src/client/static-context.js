import React, { createContext } from 'react';

const StaticContext = createContext(null);

export const StaticContextProvider = ({ children, staticContext = {} }) => {
	return <StaticContext.Provider value={staticContext}>{children}</StaticContext.Provider>;
};

export const useStaticContext = () => React.useContext(StaticContext);
