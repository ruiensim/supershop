import React from 'react'
import { FaStar,FaStarHalfAlt,FaRegStar } from 'react-icons/fa'

const Rating = ({value,text}) => {
    const stars = Array.from({ length: 5 }, (_, i) => {
        const rating = i + 1;
        return (
            <span key={i}>
                {value >= rating ? (
                    <FaStar />
                ) : value >= rating - 0.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <FaRegStar />
                )}
            </span>
        );
    });
  return (
    <div className='rating'>
        {stars}
        <span className='rating-text'>{text && `${text} reviews`}</span>
    </div>
  )
}

export default Rating
