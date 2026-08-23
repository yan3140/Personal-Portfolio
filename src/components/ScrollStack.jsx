import { useCallback, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onActiveChange,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const endOffsetRef = useRef(0);
  const lastTransformsRef = useRef(new Map());
  const lastActiveIndexRef = useRef(-1);
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePosition = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (Number.parseFloat(value) / 100) * containerHeight;
    }
    return Number.parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller?.scrollTop ?? 0,
      containerHeight: scroller?.clientHeight ?? 0,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (useWindowScroll) {
        return element.getBoundingClientRect().top + window.scrollY;
      }
      return element.offsetTop;
    },
    [useWindowScroll],
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePosition(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePosition(scaleEndPosition, containerHeight);
    const endElementTop = endOffsetRef.current;

    let activeIndex = 0;

    cardsRef.current.forEach((card, index) => {
      const cardTop = cardOffsetsRef.current[index] ?? getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + index * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount * index * scaleProgress;

      if (scrollTop >= triggerStart) activeIndex = index;

      let blur = 0;
      if (blurAmount && index < activeIndex) {
        blur = (activeIndex - index) * blurAmount;
      }

      let translateY = 0;
      if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const nextTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
      const previousTransform = lastTransformsRef.current.get(index);
      const hasChanged =
        !previousTransform ||
        Math.abs(previousTransform.translateY - nextTransform.translateY) > 0.1 ||
        Math.abs(previousTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter = nextTransform.blur ? `blur(${nextTransform.blur}px)` : "";
        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cardsRef.current.length - 1) {
        const isComplete = scrollTop >= triggerStart && scrollTop <= pinEnd;
        if (isComplete && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isComplete) {
          stackCompletedRef.current = false;
        }
      }
    });

    if (activeIndex !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = activeIndex;
      onActiveChange?.(activeIndex);
    }

    isUpdatingRef.current = false;
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    getElementOffset,
    getScrollData,
    itemScale,
    itemStackDistance,
    onActiveChange,
    onStackComplete,
    parsePosition,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    cards.forEach((card, index) => {
      if (index < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.perspective = "1000px";
      card.style.transform = "translateZ(0)";
    });

    const measureStack = () => {
      cards.forEach((card) => {
        card.style.transform = "translateZ(0)";
        card.style.filter = "";
      });
      cardOffsetsRef.current = cards.map((card) => getElementOffset(card));
      const endElement = scroller.querySelector(".scroll-stack-end");
      endOffsetRef.current = endElement ? getElementOffset(endElement) : 0;
      lastTransformsRef.current.clear();
    };

    measureStack();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => {
        card.style.transform = "none";
        card.style.marginBottom = "24px";
      });
      return undefined;
    }

    const options = {
      duration: 1.2,
      easing: (value) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    };

    const lenis = useWindowScroll
      ? null
      : new Lenis({
          ...options,
          wrapper: scroller,
          content: scroller.querySelector(".scroll-stack-inner"),
          gestureOrientation: "vertical",
        });

    const handleScroll = () => updateCardTransforms();
    if (lenis) {
      lenis.on("scroll", handleScroll);
      lenisRef.current = lenis;
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    const animate = (time) => {
      lenis?.raf(time);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (lenis) animationFrameRef.current = requestAnimationFrame(animate);
    updateCardTransforms();

    const handleResize = () => {
      measureStack();
      updateCardTransforms();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenis?.destroy();
      lenisRef.current = null;
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      endOffsetRef.current = 0;
      lastTransformsRef.current.clear();
      lastActiveIndexRef.current = -1;
      isUpdatingRef.current = false;
    };
  }, [getElementOffset, itemDistance, updateCardTransforms, useWindowScroll]);

  return (
    <div
      className={`scroll-stack-scroller${useWindowScroll ? " scroll-stack-window" : ""} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
