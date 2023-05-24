import style from './hamburger.module.css';

export default function Flower(props: any) {
  return (
    <svg
      className={`burger ${style.hamburger}`}
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="2.12866"
        y1="9.04932"
        x2="18.0573"
        y2="9.04932"
        stroke={props.blue ? "#FFDDED" : "#0000FF"}
        stroke-width="3"
        stroke-linecap="round"
      />
      <line
        x1="2.12866"
        y1="2.09009"
        x2="18.0573"
        y2="2.09009"
        stroke={props.blue ? "#FFDDED" : "#0000FF"}
        stroke-width="3"
        stroke-linecap="round"
      />
      <line
        x1="2.12866"
        y1="16.418"
        x2="18.0573"
        y2="16.418"
        stroke={props.blue ? "#FFDDED" : "#0000FF"}
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
}
