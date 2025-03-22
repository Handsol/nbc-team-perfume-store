const Navi = () => {
  return (
    <div className="flex w-full border-b border-lightgray">
      <div className="flex w-full max-w-[1000px] h-[50px] mx-auto divide-x divide-[#d3d3d3]">
        {/* 남성용 */}
        <div className="flex flex-row flex-1 items-center px-4 gap-5 min-w-0">
          <button className="font-semibold whitespace-nowrap">For Man</button>
          <div className="flex gap-6 flex-wrap shrink min-w-0">
            <button>오 드 뚜왈렛</button>
            <button>오 드 퍼퓸</button>
            <button>코롱</button>
            <button>헤어 퍼퓸</button>
          </div>
        </div>

        {/* 여성용 */}
        <div className="flex flex-row flex-1 items-center px-4 gap-5 min-w-0">
          <button className="font-semibold whitespace-nowrap">For Woman</button>
          <div className="flex gap-6 flex-wrap shrink min-w-0">
            <button>오 드 뚜왈렛</button>
            <button>오 드 퍼퓸</button>
            <button>코롱</button>
            <button>헤어 퍼퓸</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navi;
