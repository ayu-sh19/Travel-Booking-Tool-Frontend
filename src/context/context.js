import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  darkTheme: () => {},
  lightTheme: () => {}
})
export const ModeThemeProvider = ThemeContext.Provider

export default function useTheme() {
  return useContext(ThemeContext);
}