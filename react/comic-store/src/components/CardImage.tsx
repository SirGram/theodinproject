type Props={
    path: string;
    title?: string
}
export default function CardImage({path, title}: Props) {
  return (
    <div className=" h-80 overflow-hidden">
      <img
        src={path}
        alt={title}
        className=" w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
}
