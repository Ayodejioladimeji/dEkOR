import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  length?: any;
}

const CardSkeleton = (props: Props) => {
  // passing the length of array from props
  const loadingdata = Array.from({ length: props.length }, (_, index) => ({
    key: String(index),
    value: `Item ${index + 1}`,
  }));

  //
  return (
    <>
      {loadingdata?.map((item, index) => (
        <div className="mb-4 text-left" key={index}>
          <Skeleton height={220} />
          <Skeleton
            height={12}
            width={160}
            style={{
              borderRadius: "8px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          <Skeleton height={12} width={140} style={{ borderRadius: "8px" }} />
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
