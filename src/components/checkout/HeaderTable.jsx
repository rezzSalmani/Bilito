import Timer from "../UI/Timer";

const HeaderTable = ({ children }) => {
  return (
    <div className='flex items-center justify-between w-full '>
      {children}
      <div className=' flex items-center gap-2 text-xs xs:text-sm'>
        <span>زمان باقی مانده:</span>
        <span className='text-errorLight'>
          <Timer />
        </span>
      </div>
    </div>
  );
};

export default HeaderTable;
