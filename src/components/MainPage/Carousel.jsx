import {IconButton, Stack} from "@mui/material";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";
import {useRef} from "react";

export default function Carousel({children}){

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -200, // Adjust scroll distance as needed
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 200, // Adjust scroll distance as needed
        behavior: 'smooth'
      });
    }
  };


  return(
    <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'relative' }}>
      {/* Left Arrow */}
      <IconButton onClick={scrollLeft} sx={{ position: 'absolute', left: 0, zIndex: 1,
        backgroundColor: 'rgb(255,255,255)', // Gray with transparency
        color: 'black',
        '&:hover': { backgroundColor: 'rgba(193,193,193,0.9)' }, // Darker on hover
      }}>
        <ArrowBackIos />
      </IconButton>

      {/* Carousel Content */}
      <Stack
        ref={carouselRef}
        direction="row"
        spacing={2}
        sx={{
          overflowX: "scroll",
          //overflow: "hidden",
          overflowY: "visible",
          padding: 2,
          '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar on WebKit browsers
          msOverflowStyle: 'none',  // Hide scrollbar on IE and Edge
          scrollbarWidth: 'none',  // Hide scrollbar on Firefox
        }}
      >
        {children}
      </Stack>

      {/* Right Arrow */}
      <IconButton onClick={scrollRight}
                  sx={{
                    position: 'absolute',
                    right: -35,
                    zIndex: 1,
                    backgroundColor: 'rgb(255,255,255)', // Gray with transparency
                    color: 'black',
                    '&:hover': { backgroundColor: 'rgba(193,193,193,0.9)' }, // Darker on hover
                  }}>
        <ArrowForwardIos />
      </IconButton>
    </Stack>

  );
}