const ScrollToTop = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use "auto" for instant scroll
    });
  };
  return (
    <>
      <button
        onClick={() => {
          handleScroll();
        }}
        className="fixed bottom-3 right-3 z-10 cursor-pointer bg-gradient-to-b  from-amber-400 to-amber-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-3 py-2 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
      >
        <div className="relative overflow-hidden">
          <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            😍
          </p>
          <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            😘
          </p>
        </div>
      </button>
    </>
  );
};

export default ScrollToTop;
