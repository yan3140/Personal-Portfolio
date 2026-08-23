import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./LogoLoop.css";

const SMOOTH_TAU = 0.25;

const LogoLoop = memo(function LogoLoop({
  items,
  speed = 42,
  direction = "left",
  gap = 12,
  pauseOnHover = true,
  ariaLabel,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const sequenceRef = useRef(null);
  const frameRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const measure = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const width = sequenceRef.current?.getBoundingClientRect().width ?? 0;
    if (!width) return;

    setSequenceWidth(Math.ceil(width));
    setCopyCount(Math.max(2, Math.ceil(containerWidth / width) + 2));
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (sequenceRef.current) observer.observe(sequenceRef.current);
    return () => observer.disconnect();
  }, [items, measure]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !sequenceWidth || !isVisible) return undefined;

    offsetRef.current = ((offsetRef.current % sequenceWidth) + sequenceWidth) % sequenceWidth;
    const directionMultiplier = direction === "left" ? 1 : -1;
    const targetVelocity = Math.abs(speed) * directionMultiplier;

    const animate = (time) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = Math.max(0, time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const target = isHovered && pauseOnHover ? 0 : targetVelocity;
      const easing = 1 - Math.exp(-delta / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;
      offsetRef.current += velocityRef.current * delta;
      offsetRef.current = ((offsetRef.current % sequenceWidth) + sequenceWidth) % sequenceWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [direction, isHovered, isVisible, pauseOnHover, sequenceWidth, speed]);

  const lists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="logo-loop__list"
          key={`copy-${copyIndex}`}
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? sequenceRef : undefined}
        >
          {items.map((item) => (
            <li className="logo-loop__item" key={`${copyIndex}-${item}`}>
              <span className="technology-pill">
                <span className="technology-pill__dot" aria-hidden="true" />
                {item}
              </span>
            </li>
          ))}
        </ul>
      )),
    [copyCount, items],
  );

  return (
    <div
      className="logo-loop"
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      style={{ "--logo-loop-gap": `${gap}px` }}
    >
      <div
        className="logo-loop__track"
        ref={trackRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {lists}
      </div>
    </div>
  );
});

export default LogoLoop;
