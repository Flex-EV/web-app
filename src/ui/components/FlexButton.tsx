import { Button } from '../model/Button.interface';

const FlexButton = ({
  text,
  type = 'button',
  variant,
  loading = false,
  ...props
}: Button) => {
  const baseStyles =
    'px-6 py-2 rounded-lg font-medium transition-all text-white w-full';
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-400',
    danger: 'bg-red-500 hover:bg-red-400',
    neutral: 'bg-gray-500 hover:bg-gray-400',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} relative flex items-center justify-center min-h-[2.5rem]`} // Adjust the min-h value as needed
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="absolute animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4" />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default FlexButton;
