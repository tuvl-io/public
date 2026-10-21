/** The dotted feather, as a vector so it stays sharp at any size. The small file has fewer, bolder dots. */
export default function Feather({ small = false }) {
  return (
    <img
      className="feather-img"
      src={small ? '/assets/tuvl-dotted-sm.svg?v=10' : '/assets/tuvl-dotted.svg?v=10'}
      alt=""
    />
  );
}
