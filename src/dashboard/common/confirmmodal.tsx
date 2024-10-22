import Loading from "@/common/loading";
import { Modal } from "react-bootstrap";

//

interface Props {
  title: string;
  subtitle: string;
  buttonTitle: string;
  buttonColor: string;
  onSubmit: any;
  loading: boolean;
  setConfirmModal: any;
  confirmModal: boolean;
}

const ConfirmModal = (props: Props) => {
  //

  return (
    <Modal
      show={props?.confirmModal}
      onHide={() => props?.setConfirmModal(false)}
      dialogClassName="confirm-modal"
    >
      <div className="confirm">
        <div className="row">
          <div className="col-9">
            <h6>{props?.title}</h6>
            <p className="mt-3">{props?.subtitle}</p>
          </div>

          <div className="col-3">
            <div className="address-cancel float-end">
              <i
                className="bi bi-x-circle"
                onClick={() => {
                  props?.setConfirmModal(false);
                }}
              />
            </div>
          </div>
        </div>

        <hr />

        {/* Profile input section */}
        <div className="btn-container">
          <button
            className="close"
            onClick={() => props?.setConfirmModal(false)}
          >
            Close
          </button>

          <button
            style={{ background: props?.buttonColor }}
            className="delete"
            onClick={props?.onSubmit}
          >
            {props?.loading ? (
              <Loading
                height="20px"
                width="20px"
                primaryColor="#fff"
                secondaryColor="#fff"
              />
            ) : (
              props?.buttonTitle
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
