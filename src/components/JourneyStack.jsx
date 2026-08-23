import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const stageDetails = [
  {
    label: "FOUNDATION",
    topics: ["计算机基础", "Java", "数据库"],
  },
  {
    label: "BUILDING",
    topics: ["系统设计", "异步流程", "AI Agent"],
  },
  {
    label: "NEXT",
    topics: ["团队协作", "工程交付", "实习"],
  },
];

const formatIndex = (index) => String(index + 1).padStart(2, "0");

export default function JourneyStack({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  return (
    <div className="journey-layout">
      <aside className="journey-heading">
        <p className="eyebrow">JOURNEY / {formatIndex(total - 1)}</p>
        <h2 id="journey-title">成长轨迹</h2>
        <p>从基础学习到独立项目，再走向真实协作。</p>

        <div className="journey-progress" aria-live="polite">
          <div className="journey-progress__numbers">
            <strong>{formatIndex(activeIndex)}</strong>
            <span>/ {formatIndex(total - 1)}</span>
          </div>
          <div className="journey-progress__track" aria-hidden="true">
            <span style={{ transform: `scaleX(${(activeIndex + 1) / total})` }} />
          </div>
          <span className="journey-progress__label">
            {stageDetails[activeIndex]?.label}
          </span>
        </div>
      </aside>

      <ScrollStack
        className="journey-stack"
        useWindowScroll
        itemDistance={130}
        itemScale={0.025}
        itemStackDistance={24}
        stackPosition="18%"
        scaleEndPosition="6%"
        baseScale={0.92}
        rotationAmount={0.18}
        blurAmount={0}
        onActiveChange={setActiveIndex}
      >
        {items.map((item, index) => {
          const detail = stageDetails[index] ?? { label: "JOURNEY", topics: [] };

          return (
            <ScrollStackItem
              key={`${item.date}-${item.title}`}
              itemClassName={`journey-card journey-card--${index + 1}`}
            >
              <div className="journey-card__top">
                <span>{detail.label}</span>
                <time>{item.date}</time>
              </div>

              <div className="journey-card__body">
                <span className="journey-card__number" aria-hidden="true">
                  {formatIndex(index)}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>

              <ul className="journey-card__topics" aria-label="阶段重点">
                {detail.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </div>
  );
}
