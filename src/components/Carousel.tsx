import useEmblaCarousel from "embla-carousel-react"
import { ReactNode } from "react";
import './carousel.css'
import Autoplay from "embla-carousel-autoplay";

interface CarouselProps {
    slides: ReactNode[];
}

export function Carousel(props: CarouselProps) {
    const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {
                    props.slides.map((item) => {
                        return (<div className="embla__slide">{item}</div>)
                    })
                }
            </div>
        </div>
    )
}

export default Carousel;