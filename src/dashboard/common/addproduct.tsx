import { useState, useEffect } from "react";
// import { DataContext } from "@/store/GlobalState";
// import { ACTIONS } from "@/store/Actions";
// import { PostRequest } from "@/utils/requests";
// import cogoToast from "cogo-toast";
import Loading from "@/common/loading";
import statesData from "@/constants/statesdata";
import "react-phone-number-input/style.css";
import CustomSelect from "../components/custom-select";
import { Modal } from "react-bootstrap";

const initialState = {
  recipientName: "",
  state: "",
  street: "",
  recipientPhone: "",
};

//

const AddProductModal = ({ createModal, setCreateModal }) => {
  // const { state, dispatch } = useContext(DataContext);
  const [data, setData] = useState(initialState);
  const [addressLoading, setAddressLoading] = useState(false);
  const [cities, setCities] = useState(null);
  const [cityChange, setCityChange] = useState(null);
  const [selectloading, setSelectloading] = useState(true);

  //   get user Address with id
  // useEffect(() => {
  //   if (isEdit) {
  //     const res = addresses.find((item) => item.id === addressId);
  //     setData(res);
  //     setCityChange({ label: res.city, value: res.city });
  //     setSelectloading(false);
  //   }
  // }, [isEdit, addressId, addresses]);

  // get cities
  useEffect(() => {
    const res = statesData.find((item) => item.value === data?.state);
    const response = res?.lgas?.map((item) => ({
      label: item.label,
      value: item.value,
    }));
    setCities(response);
    setSelectloading(false);
  }, [data?.state]);

  // handlechange for address method
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // save address method
  const saveAddress = async (e) => {
    e.preventDefault();
    setAddressLoading(true);

    // const newAddress = {
    //   recipientName: data.recipientName,
    //   city: cityChange?.value,
    //   state: data.state,
    //   street: data.street,
    //   landmark: data.landmark,
    //   houseNumber: data.houseNumber,
    //   additionalInformation: data.additionalInformation,
    //   recipientPhone: data.recipientPhone,
    // };

    // const res = await PostRequest("/user/address", newAddress, token);
    // if (res.status === 200) {
    //   dispatch({
    //     type: ACTIONS.ADDRESSCALLBACK,
    //     payload: !state.addressCallback,
    //   });
    //   cogoToast.success(res.data.message, { hideAfter: 5 });
    //   setOpenModal(false);
    // } else {
    //   setAddressLoading(false);
    // }
  };

  //

  return (
    <Modal
      show={createModal}
      onHide={() => setCreateModal(false)}
      dialogClassName="address-modal"
    >
      <div className="address">
        <div className="row mb-2">
          <div className="col-9">
            <div className="d-flex align-items-center">
              <h6>Add New Product</h6>
              {/* <div className="btn home-sign">Home</div> */}
            </div>
          </div>

          <div className="col-3">
            <div className="address-cancel float-end">
              <i
                className="bi bi-x-circle"
                onClick={() => {
                  setCreateModal(false);
                }}
              />
            </div>
          </div>
        </div>

        {/* Profile input section */}
        <div className="form-box mt-5">
          <div className="row">
            <div className="col-12">
              <label className="mb-2">Title</label>

              <input
                type="text"
                value={data?.recipientName}
                name="recipientName"
                onChange={handleAddressChange}
                className="input form-control"
                placeholder="Enter recipient name"
              />
            </div>

            <div className="col-6">
              <label className="mb-2">Buying Price</label>
              <input
                autoComplete="off"
                type="text"
                className="input form-control"
                aria-label="street"
                value={data?.street}
                name="street"
                onChange={handleAddressChange}
                placeholder="#5000"
              />
            </div>
            <div className="col-6">
              <label className="mb-2">Selling Price</label>
              <input
                autoComplete="off"
                type="text"
                className="input form-control"
                aria-label="street"
                value={data?.street}
                name="street"
                onChange={handleAddressChange}
                placeholder="#6000"
              />
            </div>

            <div className="col-12">
              <label className="mb-2">Category</label>

              {!selectloading && (
                <CustomSelect
                  options={cities}
                  placeholder="Select an option..."
                  onChange={setCityChange}
                  defaultValue={cityChange}
                  isDisabled={false}
                />
              )}
            </div>

            <div className="col-12">
              <label className="mb-2">Product Description</label>

              <textarea placeholder="Product description"></textarea>
            </div>
          </div>

          <div className="profile-btn">
            <button
              disabled={
                !cityChange?.value ||
                cityChange?.value === "" ||
                !data?.state ||
                !data?.street
                  ? true
                  : false
              }
              className="btn"
              onClick={saveAddress}
            >
              {addressLoading ? (
                <Loading
                  height="20px"
                  width="20px"
                  primaryColor="#fff"
                  secondaryColor="#fff"
                />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
