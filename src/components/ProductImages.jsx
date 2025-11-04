import { useState } from "react";

function ProductImages({ images }) {
    const [index, setIndex] = useState(0);

    const nextImage = () => {
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="relative">
            <img
                src={images[index]}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-500 rounded-t-2xl"
            />

            {/* Botones */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        ‹
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        ›
                    </button>
                </>
            )}

            
        </div>
    );
}

export default ProductImages;
