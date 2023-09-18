import { ActionProps } from "../shared/toast.interface";

interface TitleProps {
  children: React.ReactNode;
  action?: ActionProps;
}
const Title: React.FC<TitleProps> = ({ children, action }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="max-w-170px text-sm font-normal text-white">{children}</p>
      {action ? (
        <button
          className="flex-none px-4 text-base font-medium text-blue-300"
          onClick={action.onClick}
        >
          {action.text}
        </button>
      ) : null}
    </div>
  );
};

export default Title;
