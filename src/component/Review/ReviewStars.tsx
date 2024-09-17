import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Box } from "@mui/material";

interface ReviewStarsProps {
    startNum: number;
}

const ReviewStars = ({ startNum }: ReviewStarsProps) => {
    const totalStart = 5;

    return (
        <Box sx={{ color : "orange" }}>
            {[...Array(Number(startNum))].map((_, index) => (
                <FontAwesomeIcon key={`filled-star-${index}`} icon={fas.faStar} />
            ))}
            {[...Array(totalStart - Number(startNum))].map((_, index) => (
                <FontAwesomeIcon key={`empty-star-${index}`} icon={faStar} />
            ))}
        </Box>
    );
};

export default ReviewStars;
