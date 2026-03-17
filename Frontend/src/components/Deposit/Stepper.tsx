import { Check } from 'lucide-react';

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { num: 1, label: 'Connect' },
    { num: 2, label: 'Amount' },
    { num: 3, label: 'Review' },
    { num: 4, label: 'Confirm' },
  ];

  return (
    <div className="w-full py-6 mb-8 relative">
      {/* Background Line */}
      <div className="absolute top-10 left-0 right-0 h-1 bg-slate-800 -z-10 mx-8 hidden sm:block"></div>
      
      {/* Active Line Progress */}
      <div 
        className="absolute top-10 left-0 h-1 bg-gradient-custom transition-all duration-500 ease-out -z-10 ml-8 hidden sm:block"
        style={{ width: `calc(${((currentStep - 1) / 3) * 100}% - 4rem)` }}
      ></div>

      <div className="flex justify-between relative z-10">
        {steps.map((step) => {
          const isCompleted = currentStep > step.num;
          const isActive = currentStep === step.num;
          const isPending = currentStep < step.num;

          return (
            <div key={step.num} className="flex flex-col items-center flex-1">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                  ${isActive ? 'bg-gradient-custom text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110' : ''}
                  ${isCompleted ? 'bg-emerald-500 text-white' : ''}
                  ${isPending ? 'bg-slate-800 text-slate-500 border-2 border-slate-700' : ''}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.num}
              </div>
              <span 
                className={`mt-3 text-sm font-medium transition-colors
                  ${isActive ? 'text-white' : ''}
                  ${isCompleted ? 'text-emerald-400' : ''}
                  ${isPending ? 'text-slate-500' : ''}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
