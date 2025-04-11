export const Cover = () => {
  return (<div className="h-[500px] ">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 absolute left-2 md:left-50px">
      <div className="relative md:h-[450px] h-[300px]">
        <img src="/images/hoodie.png" className="w-[650px] h-full md:h-[400px] object-cover" />
        <button className="absolute bottom-10 right-5 m-4">Explore</button>
      </div>
      <div className="relative md:h-[450px] h-[300px]">
        <img src="/images/hoodie.png" className="w-[650px] h-full md:h-[400px] object-cover" />
        <button className="absolute top-0 left-0 m-4">Men's collection</button>
      </div>
      <div className="relative hidden md:block ">
        <img src="/images/hoodie.png" className="w-[650px] h-full md:h-[400px] object-cover " />
        <button className="absolute bottom-10 right-5 m-4">Women's collection</button>
      </div>
    </div>
    </div>
  );
};
