import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const THEMES = ["default", "cream", "dark"] as const;
export type Theme = typeof THEMES[number];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("app-theme");
      return (saved as Theme) || ("default" as Theme);
    } catch {
      return "default" as Theme;
    }
  });

  useEffect(() => {
    try {
      if (theme === "default") {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
      localStorage.setItem("app-theme", theme);
    } catch (err) {
      console.error("Error applying theme:", err);
    }
  }, [theme]);

  return (
    <ButtonGroup aria-label="Theme selector" style={{ marginRight: 12 }}>
      <Button
        variant={theme === "default" ? "primary" : "secondary"}
        size="sm"
        onClick={() => setTheme("default")}
        title="Default theme"
      >
        <i className="bi bi-sun-fill" />
      </Button>
      <Button
        variant={theme === "cream" ? "primary" : "secondary"}
        size="sm"
        onClick={() => setTheme("cream")}
        title="Warm (cream) theme"
      >
        <i className="bi bi-palette-fill" />
      </Button>
      <Button
        variant={theme === "dark" ? "primary" : "secondary"}
        size="sm"
        onClick={() => setTheme("dark")}
        title="Dark theme"
      >
        <i className="bi bi-moon-fill" />
      </Button>
    </ButtonGroup>
  );
}
