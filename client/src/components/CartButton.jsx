export const CartButton = ({onClick})=>{
    return(<>
    <button lassName="mt-2">Add to cart</button>
    <div className="flex gap-3 justify-between align-middle bg-amber-50 p-1 text-white">
            <button onClick={onClick} className="bg-black hover:bg-white hover:text-black hover:border-1 p-1 object-cover w-[40px] text-xs md:w-[50px] md:text-xl rounded-full">+</button>
            <button onClick={onClick} className="bg-black hover:bg-white hover:text-black hover:border-1 p-1 object-cover w-[40px] text-xs md:w-[50px] md:text-xl rounded-full">-</button>
        </div>
    </>  
    )
} 