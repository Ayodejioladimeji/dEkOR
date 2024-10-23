import { useState, useEffect, useContext } from "react";
import Loading from "@/common/loading";
import "react-phone-number-input/style.css";
import CustomSelect from "../components/custom-select";
import { Modal } from "react-bootstrap";
import { GetRequest, PostRequest } from "@/utils/requests";
import cogoToast from "cogo-toast";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import CategoryModal from "./categorymodal";

const initialState = {
  title: "",
  buyingPrice: "",
  sellingPrice: "",
  category: "",
  description: "",
};

//

const AddProductModal = ({ createModal, setCreateModal }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState(null);
  const [categoryChange, setCategoryChange] = useState(null);
  const [selectloading, setSelectloading] = useState(true);
  const { state, dispatch } = useContext(DataContext);
  const [buttonloading, setButtonloading] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  // fetch categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await GetRequest("/category?pageSize=100");
      if (res?.status === 200) {
        const result = res?.data?.data?.map((item) => ({
          label: item?.name,
          value: item?._id,
        }));
        setCategories(result);
        setSelectloading(false);
      }
    };
    getCategories();
  }, [state?.callback]);

  // handlechange for address method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // add product
  const handleProduct = async () => {
    const token = localStorage.getItem("token") || "";

    setButtonloading(true);

    const payload = {
      title: values.title,
      buyingPrice: values.buyingPrice.replace(/,/g, ""),
      sellingPrice: values.sellingPrice.replace(/,/g, ""),
      category: categoryChange?.value,
      description: values.description,
    };

    const res = await PostRequest("/product", payload, token);
    if (res?.status === 200 || res?.status === 201) {
      dispatch({ type: ACTIONS.CALLBACK, payload: !state?.callback });
      dispatch({ type: ACTIONS.LOADING, payload: true });

      cogoToast.success(res?.data?.message);
      setCreateModal(false);
      setButtonloading(false);
    } else {
      setButtonloading(false);
    }
  };

  //

  return (
    <>
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
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                  className="input form-control"
                  placeholder="Enter recipient name"
                />
              </div>

              <div className="col-6">
                <label className="mb-2">Buying Price</label>
                <input
                  autoComplete="off"
                  type="number"
                  className="input form-control"
                  aria-label="street"
                  value={values.buyingPrice}
                  name="buyingPrice"
                  onChange={handleChange}
                  placeholder="#5000"
                />
              </div>

              <div className="col-6">
                <label className="mb-2">Selling Price</label>
                <input
                  autoComplete="off"
                  type="number"
                  className="input form-control"
                  aria-label="street"
                  value={values.sellingPrice}
                  name="sellingPrice"
                  onChange={handleChange}
                  placeholder="#6000"
                />
              </div>

              <div className="col-12">
                <label className="mb-2">
                  Category{" "}
                  <span
                    onClick={() => setCategoryModal(true)}
                    className="add-new"
                  >
                    (Add new)
                  </span>
                </label>

                <CustomSelect
                  options={categories}
                  placeholder="Select an option..."
                  onChange={setCategoryChange}
                  defaultValue={categoryChange}
                  isDisabled={selectloading ? true : false}
                />
              </div>

              <div className="col-12">
                <label className="mb-2">Product Description</label>

                <textarea
                  placeholder="Product description"
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                ></textarea>
              </div>
            </div>

            {!categoryModal && (
              <div className="profile-btn">
                <button
                  disabled={
                    values.buyingPrice === "" ||
                    values.sellingPrice === "" ||
                    values.title === "" ||
                    !categoryChange ||
                    values.description === ""
                      ? true
                      : false
                  }
                  className="btn"
                  onClick={handleProduct}
                >
                  {buttonloading ? (
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
            )}
          </div>
        </div>
      </Modal>
      {/* create category modal */}
      {categoryModal && (
        <CategoryModal
          createModal={categoryModal}
          setCreateModal={setCategoryModal}
        />
      )}
    </>
  );
};

export default AddProductModal;
