export default function Offer({
  messages,
  duration,
}: {
  messages: string[];
  duration: number;
}) {
  return (
    <section className="w-full text-zinc-100 text-center bg-rose-800 p-0.5 overflow-hidden">
      <div
        className="flex flex-row-reverse"
        style={{
          width: `${messages.length * 100 + 100}%`,
          animation: `scrollText ${
            messages.length * duration
          }s linear infinite`,
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className="w-full text-right">
            {message}
          </div>
        ))}
      </div>
      <style>{`
          @keyframes scrollText {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
    </section>
  );
}
