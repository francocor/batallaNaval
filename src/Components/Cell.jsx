import { useEffect } from "react"  

const Cell = ({status, onClick}) => {

    let className="cell"
    if (status === "hit") className += " hit"
    else if (status === "miss") className += " miss"
    else if (status === "ship") className += " ship"

    useEffect(()=>{
        if(status === "hit"){
            new Audio("/sounds/hit.mp3").play()
        } else if(status === "mis"){
            new Audio("/sounds/miss.mp3").play()
        }
    }, [status])

    return <div className={className} onClick={onClick}></div>;
};

export default Cell