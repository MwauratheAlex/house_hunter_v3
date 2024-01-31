import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function HeartButton() {
  return (
    <div className="relative cursor-pointer transition hover:opacity-80">
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart size={24} className={`fill-red-500`} />
    </div>
  );
}
