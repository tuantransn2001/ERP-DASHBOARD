import LoadingButton from "@mui/lab/LoadingButton";
import { WrapperComponent } from "src/ts/type/common";
interface Props extends WrapperComponent {
  [k: string]: unknown;
}
const MyLoadingButton = ({ children }: Props) => (
  <LoadingButton
    size="small"
    color="secondary"
    loading
    loadingPosition="start"
    variant="contained"
    fullWidth
  >
    <span>{children}</span>
  </LoadingButton>
);

export default MyLoadingButton;
