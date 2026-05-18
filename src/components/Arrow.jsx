const Arrow = ({ size = 22, rotate = 0, style = {} }) => (
  <svg
    width={size}
    height={size * 0.44}
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      flexShrink: 0,
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      ...style,
    }}
  >
    <path d="m81.115 45.133-.997 1.734 3.541 2.035-71.04-.001v2l71.491.001-3.761 2.557 1.125 1.654 7.79-5.297z" />
  </svg>
);

export default Arrow;
