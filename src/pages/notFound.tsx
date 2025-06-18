import { Link } from "react-router-dom"

const VITE_WEB_URL: string = import.meta.env.VITE_WEB_URL ?? '';

const NotFound = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-bold mb-6">404</h1>
            <h2 className="text-xl font-medium mb-2">Oops, this page not found!</h2>
            <p className="text-gray-400 text-sm mb-6">Could not find requested resource</p>
            <Link to={VITE_WEB_URL}>
                <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-black/80 transition-colors duration-300">
                    Return Home
                </button>
            </Link>
        </div>
    </div>
  )
}

export default NotFound 