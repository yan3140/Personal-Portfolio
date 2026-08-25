import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./ProjectAccordion.css";

const clampIndex = (index, count) => Math.min(Math.max(index, 0), Math.max(count - 1, 0));

export default function ProjectAccordion({ projects, defaultIndex = 0, expandRatio = 0.62, projectBase = "/projects/" }) {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const detailRefs = useRef([]);
  const collapsedRefs = useRef([]);
  const timelineRef = useRef(null);
  const firstRunRef = useRef(true);
  const [active, setActive] = useState(clampIndex(defaultIndex, projects.length));

  const applyLayout = useCallback(
    (animate) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const ratio = Math.min(Math.max(expandRatio, 0.45), 0.78);
      const grow = projects.length > 1 ? (ratio * (projects.length - 1)) / (1 - ratio) : 1;
      const duration = animate && !reducedMotion ? 0.82 : 0;

      timelineRef.current?.kill();
      const timeline = gsap.timeline({ defaults: { duration, ease: "power3.inOut" } });

      panels.forEach((panel, index) => {
        if (!panel) return;
        const isActive = index === active;
        const detail = detailRefs.current[index];
        const collapsed = collapsedRefs.current[index];

        timeline.to(
          panel,
          {
            flexGrow: isActive ? grow : 1,
            rotateY: isActive ? 0 : index < active ? 4 : -4,
          },
          0,
        );

        if (detail) {
          timeline.set(detail, { pointerEvents: isActive ? "auto" : "none" }, 0);
          timeline.to(
            detail,
            isActive
              ? { autoAlpha: 1, y: 0, duration: duration ? 0.34 : 0, ease: "power2.out" }
              : { autoAlpha: 0, y: 14, duration: duration ? 0.16 : 0, ease: "power2.out" },
            isActive && duration ? 0.36 : 0,
          );
        }

        if (collapsed) {
          timeline.to(
            collapsed,
            isActive
              ? { autoAlpha: 0, y: -10, duration: duration ? 0.14 : 0, ease: "power2.out" }
              : { autoAlpha: 1, y: 0, duration: duration ? 0.24 : 0, ease: "power2.out" },
            !isActive && duration ? 0.5 : 0,
          );
        }
      });

      timelineRef.current = timeline;
    },
    [active, expandRatio, projects.length],
  );

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      timelineRef.current?.kill();
    },
    [],
  );

  const handleKeyDown = (index, event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index + 1) % projects.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index - 1 + projects.length) % projects.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActive(index);
    }
  };

  return (
    <div ref={rootRef} className="project-accordion" role="list" aria-label="项目经历手风琴">
      {projects.map((project, index) => {
        const isActive = index === active;
        return (
          <article
            key={project.number}
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            className={`project-accordion__panel${isActive ? " is-active" : ""}`}
            data-palette={index + 1}
            role="listitem"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={`${project.name}，${isActive ? "当前展开" : "展开项目"}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          >
            <div
              ref={(element) => {
                collapsedRefs.current[index] = element;
              }}
              className="project-accordion__collapsed"
              aria-hidden={isActive}
            >
              <span>PROJECT / {project.number}</span>
              <strong>{project.name}</strong>
              <small>{project.status}</small>
            </div>

            <div
              ref={(element) => {
                detailRefs.current[index] = element;
              }}
              className="project-accordion__detail"
              aria-hidden={!isActive}
            >
              <header className="project-accordion__topline">
                <span>PROJECT / {project.number}</span>
                <span className="project-accordion__status">
                  <i aria-hidden="true" />
                  {project.status}
                </span>
              </header>

              <div className="project-accordion__body">
                <div className="project-accordion__intro">
                  <p>{project.category}</p>
                  <h3>
                    <a href={`${projectBase}${project.slug}/`} onClick={(event) => event.stopPropagation()}>
                      {project.name}
                    </a>
                  </h3>
                  <p className="project-accordion__summary">{project.summary}</p>
                  <div className="project-accordion__contribution">
                    <strong>MY PART</strong>
                    <p>{project.contribution}</p>
                  </div>
                </div>

                <div className="project-accordion__evidence">
                  <p>KEY HIGHLIGHTS</p>
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <footer className="project-accordion__footer">
                <div className="project-accordion__tags" aria-label="项目技术栈">
                  {project.stack.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <div className="project-accordion__links">
                  <a href={`${projectBase}${project.slug}/`} onClick={(event) => event.stopPropagation()}>
                    VIEW DETAILS <span aria-hidden="true">-&gt;</span>
                  </a>
                </div>
              </footer>
            </div>
          </article>
        );
      })}
    </div>
  );
}
