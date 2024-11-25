interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';
  text: string;
  variant: 'primary' | 'danger' | 'neutral';
}

const FlexButton = ({ text, type, variant, ...props }: Button) => {
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
      {...props}
    >
      {text}
    </button>
  );
};

export default FlexButton;
