import { useNavigate } from "react-router-dom";

export const Cover = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-[70vh]">
      
      {/* Men Section */}
      <div
        onClick={() => navigate("/store/men")}
        className="relative group cursor-pointer overflow-hidden h-[35vh] md:h-auto bg-cover bg-center"
        style={{
          backgroundImage:
            'url("images/men-main.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center">
          <span
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            className="text-white text-3xl md:text-5xl tracking-wide border-2"
          >
             Men's section
          </span>
        </div>
      </div>

      {/* Women Section */}
      <div
        onClick={() => navigate("/store/women")}
        className="relative group cursor-pointer overflow-hidden h-[35vh] md:h-auto bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center">
          <span
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            className="text-pink-800 text-3xl md:text-5xl tracking-wide border-2"
          >
            Women's section
          </span>
        </div>
      </div>

    </div>
  );
};
