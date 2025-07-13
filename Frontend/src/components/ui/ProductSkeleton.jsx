import Skeleton from "react-loading-skeleton";

const ProductSkeleton = () => {
  return (
    <div className="p-1">
      <Skeleton height={200} width="100%" className="mb-2" /> 
      <Skeleton height={20} width="80%" className="mb-2" /> 
      <Skeleton height={16} width="60%" /> 
    </div>
  );
};

export default ProductSkeleton;