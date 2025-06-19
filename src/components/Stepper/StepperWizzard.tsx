type Props = {
  step: number;
};


const StepperWizzard = ({ step}: Props) => {

  return (
    <>
      <div className="flex justify-items-center items-center mt-4">
        <div className={`border w-5 rounded-full h-5 text-center leading-4 ${step >= 0 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          1
        </div>
        <div className={`w-1 h-1 flex-1 ${step >= 1 ? "bg-blue-500 " : "bg-gray-300"}`}></div>

        <div className={`border w-5 rounded-full h-5 text-center leading-4 ${step >= 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          2
        </div>
        <div className={`w-1 h-1 flex-1 ${step >= 2 ? "bg-blue-500 " : "bg-gray-300"}`}></div>
        <div className={`border w-5 rounded-full h-5 text-center leading-4 ${step >= 2 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          3
        </div>
      </div>
     
    </>
  );
};
export default StepperWizzard;
