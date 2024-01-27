const MenuItem = (props: { label: string }) => {
  return (
    <div className="cursor-pointer px-4 py-3 font-semibold transition hover:bg-neutral-100">
      {props.label}
    </div>
  );
};

export default MenuItem;
