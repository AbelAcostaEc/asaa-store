import { useState } from "react";

function ProductImages({ images }) {
    const [index, setIndex] = useState(0);

    const nextImage = () => {
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToImage = (i) => {
        setIndex(i);
    };

    return (
        <div className="relative h-full w-full bg-gray-100">
            {/* Image */}
            <img
                src={images[index]}
                alt={`Imagen ${index + 1}`}
                className="h-full w-full object-contain transition-all duration-500"
            />

            {/* Navigation Arrows - Only show if multiple images */}
            {images.length > 1 && (
                <>
                    {/* Previous Button */}
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition-all duration-300 hover:bg-black/90 hover:scale-110 sm:h-12 sm:w-12"
                        aria-label="Imagen anterior"
                    >
                        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition-all duration-300 hover:bg-black/90 hover:scale-110 sm:h-12 sm:w-12"
                        aria-label="Imagen siguiente"
                    >
                        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToImage(i)}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${i === index
                                        ? "w-6 bg-white shadow-lg"
                                        : "bg-white/60 hover:bg-white/80"
                                    }`}
                                aria-label={`Ir a imagen ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Image Counter */}
                    <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white shadow-lg sm:text-sm">
                        {index + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductImages;
