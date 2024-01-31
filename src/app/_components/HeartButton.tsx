import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function HeartButton() {
  return (
    <div
      className="flex h-12 w-12  justify-end"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="relative cursor-pointer  transition hover:opacity-80">
        <AiOutlineHeart
          size={28}
          className="absolute -right-[2px] -top-[2px] fill-white"
        />
        <AiFillHeart size={24} className={`fill-red-500`} />
      </div>
    </div>
  );
}
