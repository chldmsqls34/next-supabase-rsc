import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'text' | 'secondary' | 'filled' | 'ghost';
}

const BasicButton = ({ 
  children, 
  className, 
  variant = 'text',
  ...rest 
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        'h-9 px-3 py-1.5 gap-2 rounded-md text-sm',
        {
          'text-[#6D6D6D] hover:bg-[#F6F6F6] active:bg-[#F0F0F0] active:text-[#000000] active:border active:border-[#D2D2D2] focus:text-[#000000] focus:border focus:border-[#5F5F5F]': variant === 'text',
          'border text-[#E79057] border-[#E79057] hover:bg-[#FFF9F5] hover:border-[#E79057] active:text-[#AD4500] active:bg-[#FFF9F5] active:border-[#E79057] focus:text-[#AD4500] focus:bg-[#FFC097] focus:border-[#E79057]': variant === 'secondary',
          'text-white bg-[#E79057] hover:border hover:border-[#E26F24] active:bg-[#E26F24] focus:bg-[#AD4500]': variant === 'filled',
          'text-[#939393] bg-[#F6F6F6] hover:bg-[#E7E7E7] active:text-[#454545] active:bg-[#E7E7E7] active:border-t active:border-transparent focus:text-[#000000] focus:bg-[#F6F6F6] focus:border-t focus:border-transparent': variant === 'ghost',
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
export default BasicButton;
