import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  style?: string;
}

const Skeletons = (props: Props) => {
  //
  return (
    <div>
      <Skeleton className={props?.style} />
    </div>
  );
};

export default Skeletons;
