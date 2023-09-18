import { ShimmerSimpleGallery } from "react-shimmer-effects";

const LoadingComponent = () => {
  return (
    <>
      <ShimmerSimpleGallery imageType="circular" imageHeight={200} caption />
      <ShimmerSimpleGallery card imageHeight={300} />
      <ShimmerSimpleGallery card imageHeight={300} caption />
    </> 
  );
};

export default LoadingComponent;
