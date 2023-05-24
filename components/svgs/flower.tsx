import style from './flower.module.css';

export default function Flower(props: any) {
  return (
    <svg
      className={`flower ${style.flower}`}
      width="15"
      height="23"
      viewBox="0 0 15 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.48 7.05153C14.48 10.9097 9.39724 22.15 7.42482 22.15C5.4524 22.15 0.369629 10.9097 0.369629 7.05153C0.369629 3.19335 3.52835 0.0656738 7.42482 0.0656738C11.3213 0.0656738 14.48 3.19335 14.48 7.05153Z"
        fill={props.blue ? "#0000FF" : "#FFDDED"}
      />
      <ellipse
        cx="7.42492"
        cy="7.69486"
        rx="5.03942"
        ry="4.8184"
        fill={props.blue ? "#FFDDED" : "#0000FF"}
      />
    </svg>
  );
}
