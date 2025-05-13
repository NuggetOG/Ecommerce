export const Cover = () => {
  return (<div className="h-screen w-full flex justify-between gap-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <img src="/images/white.png"  />
        <img src="/images/white2.png"  />
        <label style={{ fontFamily: '"Bebas Neue", sans-serif' }} className="z-10"> Explore Men</label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <label style={{ fontFamily: '"Bebas Neue", sans-serif' }} className="z-10"> Explore Men</label>
        <img src="/images/white3.png" />
        <img src="/images/white4.png" />
      </div>
    </div>
  );
};
