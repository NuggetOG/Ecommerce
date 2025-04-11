export const Button = ({onClick})=>{
    return(
        <button onClick={onClick} className="bg-black rounded-2xl hover:bg-white hover:text-black hover:border-1 p-2 mb-2 w-[90px] h-[40px] text-white"  style={{ fontFamily: '"Bebas Neue", sans-serif' }}
>Buy now</button>
    )
}