const SkipIcon = ({
  size,
  colour,
  filter,
}: {
  size: string;
  colour: string;
  filter: string;
}) => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 65.518 65.518"
    width={size}
    height={size}
    fill={colour}
    filter={filter}
  >
    <g>
      <path
        d="M32.759,0C14.696,0,0,14.695,0,32.759s14.695,32.759,32.759,32.759s32.759-14.695,32.759-32.759S50.822,0,32.759,0z
        M6,32.759C6,18.004,18.004,6,32.759,6c6.648,0,12.734,2.443,17.419,6.472L12.472,50.178C8.443,45.493,6,39.407,6,32.759z
        M32.759,59.518c-5.948,0-11.447-1.953-15.895-5.248l37.405-37.405c3.295,4.448,5.248,9.947,5.248,15.895
       C59.518,47.514,47.514,59.518,32.759,59.518z"
      />
    </g>
  </svg>
);
export default SkipIcon;