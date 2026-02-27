import { useEffect } from "react";

/**
 * Maps CMS theme keys to CSS custom property names defined in base.css.
 */
const THEME_MAP = {
  primaryColor: "--primary-color",
  primaryLight: "--primary-light",
  primaryDark: "--primary-dark",
  secondaryColor: "--secondary-color",
  secondaryLight: "--secondary-light",
};

/**
 * DynamicTheme — injects CMS-managed color values as CSS custom properties
 * on the document root element.
 *
 * Drop this anywhere inside the React tree (e.g. inside App). It renders
 * nothing to the DOM — it's purely a side-effect component.
 *
 * @param {Object} props
 * @param {Object} props.theme - Theme object from {@link useCmsContent}.
 * @returns {null}
 *
 * @example
 * <DynamicTheme theme={content.theme} />
 */
function DynamicTheme({ theme }) {
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    Object.entries(THEME_MAP).forEach(([cmsKey, cssVar]) => {
      if (theme[cmsKey]) {
        root.style.setProperty(cssVar, theme[cmsKey]);
      }
    });

    // Clean up: restore defaults when the component unmounts (e.g. in tests)
    return () => {
      Object.values(THEME_MAP).forEach((cssVar) => {
        root.style.removeProperty(cssVar);
      });
    };
  }, [theme]);

  return null;
}

export default DynamicTheme;
