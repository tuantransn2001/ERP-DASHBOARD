import LoadingButton from "@mui/lab/LoadingButton";
import { WrapperComponent } from "src/ts/type/common";
import { Button } from "@mui/material";
interface Props extends WrapperComponent {
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}
const MyButton = ({
  children,
  isLoading,
  className,
  onClick,
  fullWidth,
}: Props) => {
  return isLoading ? (
    <LoadingButton
      className={className}
      size="small"
      color="secondary"
      loading
      variant="contained"
      fullWidth={fullWidth}
    >
      <span>{children}</span>
    </LoadingButton>
  ) : (
    <Button
      onClick={onClick}
      className={className}
      variant="contained"
      type="submit"
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};

export default MyButton;
