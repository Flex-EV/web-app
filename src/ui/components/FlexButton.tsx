import { Button } from '../model/Button.interface';

const FlexButton = ({
  text,
  type = 'button',
  variant,
  loading = false,
  ...props
}: Button) => {
  const baseStyles =
    'px-6 py-2 rounded-lg font-medium transition-all text-white';
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-400',
    danger: 'bg-red-500 hover:bg-red-400',
    neutral: 'bg-gray-500 hover:bg-gray-400',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></div>
      ) : (
        text
      )}
    </button>
  );
};

export default FlexButton;
