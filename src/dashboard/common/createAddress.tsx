import { useState, useEffect, useContext } from "react";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
import Loading from "@/common/loading";
import statesData from "@/constants/statesdata";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CustomSelect from "../components/custom-select";
import { Modal } from "react-bootstrap";
import { PostRequest } from "@/utils/requests";
import cogoToast from "cogo-toast";

const initialState = {
  name: "",
  address: "",
  region: "",
  phone: "",
};

//

const CreateAddressModal = ({ createModal, setCreateModal }) => {
  const { state, dispatch } = useContext(DataContext);
  const [data, setData] = useState(initialState);
  const [addressLoading, setAddressLoading] = useState(false);
  const [cities, setCities] = useState(null);
  const [cityChange, setCityChange] = useState(null);
  const [selectloading, setSelectloading] = useState(true);

  // get cities
  useEffect(() => {
    const res = statesData.find((item) => item.value === data?.region);
    const response = res?.lgas?.map((item) => ({
      label: item.label,
      value: item.value,
    }));
    setCities(response);
    setSelectloading(false);
  }, [data?.region]);

  // handlechange for address method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // handle change for phone number
  const changePhoneNumber = (e) => {
    setData((prevState) => ({
      ...prevState,
      phone: e,
    }));
  };

  // save address method
  const saveAddress = async (e) => {
    e.preventDefault();
    setAddressLoading(true);

    const token = localStorage.getItem("token") || "";

    const payload = {
      name: data?.name,
      address: data?.address,
      region: data?.region,
      city: cityChange,
      phone: data?.phone,
    };

    const res = await PostRequest("/address-book", payload, token);

    if (res.status === 200) {
      dispatch({
        type: ACTIONS.CALLBACK,
        payload: !state.callback,
      });
      cogoToast.success(res.data.message, { hideAfter: 5 });
      setCreateModal(false);
      setAddressLoading(false);
    } else {
      setAddressLoading(false);
    }
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
              <h6>Add New Address</h6>
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
              <label className="mb-2">{`Recipient's Name`}</label>

              <input
                type="text"
                value={data?.name}
                name="name"
                onChange={handleChange}
                className="input form-control"
                placeholder="Enter recipient name"
              />
            </div>

            <div className="col-12">
              <label className="mb-2">Phone number</label>
              <div className="inputs">
                <PhoneInput
                  name="phone"
                  defaultCountry="NG"
                  value={data.phone}
                  onChange={changePhoneNumber}
                  className="phoneinput"
                  placeholder="e.g 080 XXXXXXXX"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label className="mb-2">Street Name</label>
              <input
                autoComplete="off"
                type="text"
                className="input form-control"
                aria-label="street"
                value={data?.address}
                name="address"
                onChange={handleChange}
                placeholder="Folorunsho street, Agelekale, Abule Egba"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <label className="mb-2">State</label>

              <select
                className="form-select"
                id="inputState"
                value={data?.region}
                name="region"
                onChange={handleChange}
              >
                <option defaultValue="Select state">Select state</option>
                {statesData.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="mb-2">Area</label>

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
          </div>

          <div className="profile-btn">
            <button
              disabled={
                !cityChange?.value ||
                cityChange?.value === "" ||
                !data?.region ||
                !data?.address ||
                !data?.phone
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

export default CreateAddressModal;
