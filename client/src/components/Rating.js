import React from "react";

function Rating(props) {
  return (
    <>
      <i
        className={
          props.rating >= 1
            ? "fas fa-star"
            : props.rating >= 0.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      />
      <i
        className={
          props.rating >= 2
            ? "fas fa-star"
            : props.rating >= 1.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      />
      <i
        className={
          props.rating >= 3
            ? "fas fa-star"
            : props.rating >= 2.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      />
      <i
        className={
          props.rating >= 4
            ? "fas fa-star"
            : props.rating >= 3.5
            ? "fas fa-star-half-stroke"
            : "far fa-star"
        }
      />
      <i
        className={
          props.rating >= 5
            ? "fas fa-star"
            : props.rating >= 4.5
            ? "fa-solid fa-star-half-stroke"
            : "far fa-star"
        }
      />
      <span style={{fontSize: "13px"}}>{" "+props.rating +" "}{props.orders+" "}orders</span>
    </>
  );
}

export default Rating;
