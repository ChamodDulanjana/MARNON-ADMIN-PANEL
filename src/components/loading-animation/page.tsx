import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingAnimation = () => {
   return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
            <div className="max-md:w-20 max-md:h-20 w-32 h-32">
                <DotLottieReact
                    src="src\assets\animation\loading_animation.json"
                    loop
                    autoplay
                />
            </div>
       </div>
   );
};


export default LoadingAnimation;