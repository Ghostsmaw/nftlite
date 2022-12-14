import React from 'react'

const Banner = ({parentStyles, name, childStyles}) => {
    return (
        <div className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyles}`}>
            <p className={`font-bold text-5xl font-poppins leading-70 ${childStyles}`}>{name}</p>
            <div className="absolute w-48 h-48 sm:h-32 sm:w-32 rounded-full white-bg -top-9 -left-16 -z-5"></div>
            <div className="absolute w-72 h-72 sm:h-56 sm:w-56 rounded-full white-bg -bottom-24 -right-14 -z-5"></div>
        </div>
    )
}

export default Banner
