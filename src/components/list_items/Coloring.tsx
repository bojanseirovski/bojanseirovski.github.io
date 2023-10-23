import React from "react";
import dayjs from "dayjs"

type ColoringProps = {
    cid: number;
    date: string;
}
const Coloring:React.FunctionComponent<ColoringProps> = (props) => {
    const {cid, date} = props;
    return (
        <div className="row">
            <div className="col-3">
                {cid}
            </div>
            <div className="col-9 text-left">
                <a href={"/?coloring="+cid}>{dayjs(date).format("d MMM YYYY")}</a>
            </div>
        </div>
    );
}

export default Coloring;