import { Input } from "../ui/input"

const PayUser = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl mb-4">주문자 정보</h2>
        <div className="flex flex-col gap-2 justify-start py-6  px-8">
            <div className="flex flex-row gap-6 container">
                <label className='w-28 break-words'>이름</label>
                <Input>

                </Input>
            </div>
        </div>
    </div>
  )
}

export default PayUser