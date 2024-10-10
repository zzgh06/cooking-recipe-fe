import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

interface ReviewStarsProps {
    startNum: number;
}

const ReviewStars = ({ startNum }: ReviewStarsProps) => {
    const totalStars = 5;

    return (
        <div className="text-orange-500">
            {[...Array(Number(startNum))].map((_, index) => (
                <FontAwesomeIcon key={`filled-star-${index}`} icon={solidStar} />
            ))}
            {[...Array(totalStars - Number(startNum))].map((_, index) => (
                <FontAwesomeIcon key={`empty-star-${index}`} icon={regularStar} />
            ))}
        </div>
    );
};

export default ReviewStars;
