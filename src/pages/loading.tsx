import {CircularProgress} from "@heroui/react";

const LoadingAnimation = () => {
   return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/50 z-[9999]">
            <CircularProgress aria-label="Loading..." size="lg" />
       </div>
   );
};


export default LoadingAnimation;