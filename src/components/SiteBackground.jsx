import { useEffect, useState } from "react";
import GradientWaves from "./GradientWaves.jsx";

const styles = {
  blue: {
    horizonColor: "#5227FF",
    waveColor: "#FF9FFC",
    crestColor: "#FFFFFF",
    opacity: 1,
    brightness: 1,
  },
  light: {
    horizonColor: "#E8DEFF",
    waveColor: "#9B7CFF",
    crestColor: "#FFF6FF",
    opacity: 0.82,
    brightness: 1,
  },
};

export default function SiteBackground() {
  const [style, setStyle] = useState("blue");

  useEffect(() => {
    const syncStyle = () => {
      setStyle(document.documentElement.dataset.style === "light" ? "light" : "blue");
    };

    syncStyle();
    window.addEventListener("portfolio-style-change", syncStyle);
    return () => window.removeEventListener("portfolio-style-change", syncStyle);
  }, []);

  const colors = styles[style];

  return (
    <div className="site-gradient-waves" aria-hidden="true">
      <GradientWaves
        {...colors}
        speed={0.4}
        amplitude={2.5}
        waveScale={0.6}
        waveRatio={0.9}
        swell={35}
        turbulence={20}
        tilt={1.11}
        zoom={1}
        height={5.5}
        fogDepth={style === "light" ? 24 : 15}
        detail="low"
        maxFps={30}
        mouseInteraction
        parallaxStrength={0.5}
        grain
        grainIntensity={0.05}
      />
    </div>
  );
}
