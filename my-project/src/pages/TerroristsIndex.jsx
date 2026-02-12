import { useState } from "react";
import { TerroristsList } from "../components/TerroristsList";
import { terrorists } from '../assets/data/terrorists_data'
import { Filter } from "../components/Filter";

export function TerroristsIndex() {
    const [ state , setState ] = useState({
        terrorists : terrorists,
    })
    

    return (
        <div className="main-container">
            <Filter 
             setState={setState}
             />
            <TerroristsList
             terrorists={state.terrorists}
             setState={setState}
             />
        </div>
    )
}