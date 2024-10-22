import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  length?: any;
}

const PaymentSkeleton = (props: Props) => {
  // passing the length of array from props
  const loadingdata = Array.from({ length: props.length }, (_, index) => ({
    key: String(index),
    value: `Item ${index + 1}`,
  }));

  //
  return (
    <>
      {loadingdata?.map((item, index) => (
        <div className="mb-4 text-center" key={index}>
          <Skeleton height={170} className="skeletal-image" />
        </div>
      ))}
    </>
  );
};

export default PaymentSkeleton;
