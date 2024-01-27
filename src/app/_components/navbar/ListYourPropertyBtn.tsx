import toast from "react-hot-toast";

export default function ListYourPropertyBtn(props: {
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={() => toast.error("Please sign in to list your property")}
      className=" cursor-pointer rounded-full px-4
    py-3 text-sm font-semibold transition hover:bg-neutral-100"
    >
      {props.label}
    </div>
  );
}
