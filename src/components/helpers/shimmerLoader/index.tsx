import { ShimmerSimpleGallery } from "react-shimmer-effects";

const LoadingComponent = () => {
  return (
    <>
      <ShimmerSimpleGallery imageType="circular" imageHeight={2} caption />
      <ShimmerSimpleGallery card imageHeight={3} />
      <ShimmerSimpleGallery card imageHeight={3} caption />
    </>
  );
};

export default LoadingComponent;
