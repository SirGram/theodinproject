export default function Offer({
  freeShippingLimit
}: {freeShippingLimit:number
}) {
  return (
    <div className="w-full text-zinc-100  bg-blue-700 p-0.5 overflow-hidden text-center">
     <h3>Free shipping on orders above ${freeShippingLimit}</h3>
    </div>
  );
}
