type Props={
    path: string;
    title?: string;
    height?: string
}
export default function CardImage({path, title, height='full'}: Props) {
  return (
    <div className={` h-${height} overflow-hidden w-full`}>
      <img
        src={path}
        alt={title}
        className=" w-full h-full transform transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
}
