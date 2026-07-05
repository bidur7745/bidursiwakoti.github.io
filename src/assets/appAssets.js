import wallpaper from "./wallpaper.jpg";
import macwallpaper01 from "./macwallpaper01.jpg";
import macwallpaper02 from "./macwallpaper02.jpg";
import macwallpaper03 from "./macwallpaper03.jpg";
import macwallpaper04 from "./macwallpaper04.jpeg";
import macwallpaper4 from "./macwallpaper4.jpg";
import macwallpaper5 from "./macwallpaper5.jpg";
import menuLogo from "./icon/icons8-mac-os-64.png";
import aboutIcon from "./icon/notes_macos_bigsur_icon_189901.png";
import finderIcon from "./icon/finder_macos_bigsur_icon_190173.png";
import terminalIcon from "./icon/terminal_macos_bigsur_icon_189655.png";
import projectsIcon from "./icon/macos_big_sur_apps_folder_icon_186038.png";
import skillsIcon from "./icon/calculator_macos_bigsur_icon_190313.png";
import resumeIcon from "./icon/safari_macos_bigsur_icon_189770.png";
import mailIcon from "./icon/mail_macos_bigsur_icon_190003.png";
import settingsIcon from "./icon/settings_macos_bigsur_icon_189754.png";
import previewIcon from "./icon/preview_macos_bigsur_icon_189813.png";
import developerProfileIcon from "./icon/developer profile.png";
import resumePdf from "./Documents/Bidur Siwakoti Resume.pdf";

export const desktopAssets = {
  wallpaper,
  wallpapers: [
    { id: "default", label: "Big Sur Night", src: wallpaper },
    { id: "aurora", label: "Aurora Blue", src: macwallpaper01 },
    { id: "coast", label: "Coast Glow", src: macwallpaper02 },
    { id: "purple", label: "Purple Horizon", src: macwallpaper03 },
    { id: "ridge", label: "Mountain Ridge", src: macwallpaper04 },
    { id: "sunrise", label: "Sunrise Lake", src: macwallpaper4 },
    { id: "peaks", label: "Frozen Peaks", src: macwallpaper5 },
  ],
  menuLogo,
  aboutIcon,
  finderIcon,
  terminalIcon,
  projectsIcon,
  skillsIcon,
  resumeIcon,
  mailIcon,
  settingsIcon,
  previewIcon,
  developerProfileIcon,
  resumePdf,
};

export default desktopAssets;
