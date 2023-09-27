import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetState, WrapperComponent } from "src/ts/type/common";
import * as classNames from "classnames/bind";
import style from "./styles/modal.module.scss";

const cx = classNames.bind(style);

interface Props extends WrapperComponent {
  title?: string;
  isVisible: boolean;
  setIsVisible: SetState<boolean>;
}
const MyModal = ({ children, title, isVisible, setIsVisible }: Props) => {
  const handleCloseModal = () => setIsVisible(false);

  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={cx("myModal", { isVisible: isVisible })}
    >
      <div className="relative w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon className="w-3 h-3" icon={faXmark} />
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {title ?? ""}
            </h3>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyModal;
