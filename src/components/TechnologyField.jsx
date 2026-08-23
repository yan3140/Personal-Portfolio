import LogoLoop from "./LogoLoop";

const laneMotion = [
  { direction: "left", speed: 44 },
  { direction: "right", speed: 36 },
  { direction: "left", speed: 40 },
  { direction: "right", speed: 32 },
];

export default function TechnologyField({ groups }) {
  return (
    <div className="technology-field">
      {groups.map((group, index) => {
        const motion = laneMotion[index % laneMotion.length];

        return (
          <section
            className={`technology-lane technology-lane--${group.tone}`}
            key={group.title}
            aria-labelledby={`technology-lane-${index}`}
          >
            <header className="technology-lane__heading">
              <span>{group.index}</span>
              <h3 id={`technology-lane-${index}`}>{group.title}</h3>
              <small>{String(group.items.length).padStart(2, "0")}</small>
            </header>

            <LogoLoop
              items={group.items}
              direction={motion.direction}
              speed={motion.speed}
              gap={12}
              pauseOnHover
              ariaLabel={`${group.title}技术栈`}
            />
          </section>
        );
      })}
    </div>
  );
}
