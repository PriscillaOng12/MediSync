import React from "react";

const Card = ({text, number , content }) => {
    return (
        <>
            <div className="rounded-lg bg-white image-shadow py-2 px-8">
                <h3 className="text-lg font-bold mb-1">{text}</h3>
                <span className="flex items-start font-bold text-3xl text-primary">
                {number} {content}
        </span>
            </div>

        </>
    );
};

export default Card;
