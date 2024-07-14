import { useContext } from "react";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import { SuccessCheckMark } from "../../../public/assets";

//

const SuccessModal = ({ show, onHide, name }) => {
  const router = useRouter();
  const { dispatch } = useContext(DataContext);

  //
  const handleContinue = () => {
    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    dispatch({ type: ACTIONS.DELETECART, payload: [] });
    router.push("/product");
  };

  //

  return (
    <Modal
      show={show}
      onHide={() => onHide(false)}
      dialogClassName="success-modal"
    >
      <div className="success">
        <div className="heading">
          <SuccessCheckMark />
        </div>

        <h4>Hi, {name}</h4>
        <p>
          Your order has been successfully confirmed. Kindly download your order
          receipt from the registered email you entered.
        </p>

        <button onClick={handleContinue}>Continue Shopping</button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
