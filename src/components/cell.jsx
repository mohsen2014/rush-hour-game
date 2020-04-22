import React from "react";

import "./../styles/cell.scss";

export const Cell = React.forwardRef((props,ref) => {
    return(
        <div className="cell" name={props.name} ref={ref}>
        </div>
    )
})
