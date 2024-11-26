export interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';
  text: string;
  variant: 'primary' | 'danger' | 'neutral';
}
