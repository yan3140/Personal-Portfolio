import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useMemo, useRef, useState } from "react";
import "./Dock.css";

function DockItem({ item, mouseX, spring, distance, magnification, baseItemSize }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mouseDistance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return value - bounds.x - bounds.width / 2;
  });
  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      style={{ width: size, height: size }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={item.onClick}
      className={`dock-item ${item.className || ""}`.trim()}
      aria-label={item.label}
    >
      <span className="dock-icon" aria-hidden="true">{item.icon}</span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            className="dock-label"
            role="tooltip"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  magnification = 44,
  distance = 110,
  panelHeight = 42,
  dockHeight = 64,
  baseItemSize = 34,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification],
  );
  const heightTarget = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightTarget, spring);

  return (
    <motion.div style={{ height }} className="dock-outer">
      <motion.nav
        onMouseMove={({ clientX }) => {
          isHovered.set(1);
          mouseX.set(clientX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`.trim()}
        style={{ height: panelHeight }}
        aria-label="主要导航"
      >
        {items.map((item) => (
          <DockItem
            key={item.id}
            item={item}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </motion.nav>
    </motion.div>
  );
}
