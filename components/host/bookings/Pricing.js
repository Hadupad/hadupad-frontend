export default function Pricing(){
    return(
        <div className="pt-6">
        <p>Base Price</p>
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
                <a href="" className="text-sm text-black text:underline cursor pointer">Add</a>
              </div>
            </div>
          </div>
         
    </div>
    )
}