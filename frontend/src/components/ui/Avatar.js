import React from 'react';
import { baseUrl } from '../../constants/api.constant';

const Avatar = ({ photo, name, size = 40 }) => {
    const imageUrl = photo ? `${baseUrl}/${photo}` : 'https://via.placeholder.com/40';

    return (
        <img
            src={imageUrl}
            alt={name}
            className="rounded-full"
            style={{ width: `${size}px`, height: `${size}px`, objectFit: 'cover' }}
        />
    );
};

export default Avatar;
