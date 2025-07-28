import { FaChevronDown } from "react-icons/fa";

export default function Availability() {
  return (
    <>
      <div className="pt-6">
        <p className="font-semibold">Trip Length</p>
        <div className="flex flex-col gap-4 pt-6 w-full">
          <div className="border border-black/10 rounded-md w-[230px] p-4 w-full">
            <div className="flex justify-between items-center">
              <p className="text-sm text-black">Per night</p>
              <p className="text-sm text-black text-underline">NG</p>
            </div>

            <p className="text-[20px] font-semibold leading-[19.62px] tracking-normal align-middle pt-6 text-black">
              ₦50,000
            </p>
          </div>
          <div className="border border-black/10 rounded-md w-[230px] p-4 w-full">
            <div className="flex justify-between items-center">
              <p className="text-sm text-black">Custom weekend price</p>
              <a
                href=""
                className="text-sm text-black text:underline cursor pointer"
              >
                Add
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <p className="font-semibold">Availability</p>
        <div className="flex flex-col gap-4 pt-6 w-full">
          <div className="border border-black/10 rounded-md  p-4 w-full">
            <p className="text-sm text-black text-[11px] ">Advance notice</p>

            <div className="flex justify-between pt-2 gap-2">
              <p className="text-[11px] font-semibold leading-[19.62px] text-black">
                Same day
              </p>
              <FaChevronDown className="text-[14px] mt-[1px]" />
            </div>
          </div>
        </div>
         <div className="flex flex-col gap-4 pt-6 w-full">
          <div className="border border-black/10 rounded-md  p-4 w-full">
            <p className="text-sm text-black text-[11px] ">Same day advance notice</p>

            <div className="flex justify-between pt-2 gap-2">
              <p className="text-[11px] font-semibold leading-[19.62px] text-black">
                12:00 am
              </p>
              <FaChevronDown className="text-[14px] mt-[1px]" />
            </div>
          </div>
        </div>
         <div className="flex flex-col gap-4 pt-6 w-full">
          <div className="border border-black/10 rounded-md  p-4 w-full">
            <p className="text-sm text-black text-[11px] ">Availability window</p>

            <div className="flex justify-between pt-2 gap-2">
              <p className="text-[11px] font-semibold leading-[19.62px] text-black">
                12 months in advance
              </p>
              <FaChevronDown className="text-[14px] mt-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
