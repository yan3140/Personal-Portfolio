import { FolderOpen, Home, Milestone, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Dock from "./Dock.jsx";

const icons = {
  home: Home,
  portfolio: FolderOpen,
  timeline: Milestone,
  about: UserRound,
};

export default function HeaderDock({ links }) {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sectionIds = links.map((link) => link.sectionId).filter(Boolean);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      setActiveId("portfolio");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (!visible) return;
        const match = links.find((link) => link.sectionId === visible.target.id);
        if (match) setActiveId(match.id);
      },
      { rootMargin: "-32% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  const items = useMemo(
    () =>
      links.map((link) => {
        const Icon = icons[link.id] || Home;
        return {
          ...link,
          icon: <Icon size={17} strokeWidth={1.8} />,
          className: activeId === link.id ? "is-active" : "",
          onClick: () => setActiveId(link.id),
        };
      }),
    [activeId, links],
  );

  return <Dock items={items} />;
}
