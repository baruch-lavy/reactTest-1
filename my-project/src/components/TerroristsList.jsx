import { useState } from "react";
import { terrorists } from "../assets/data/terrorists_data";

export function TerroristsList({ terrorists, setState }) {
  const [terroristToEliminate, setTerroristToEliminate] = useState("");
  const list = terrorists;
  function openPanel(terrorist) {
    const pannel = document.querySelector(".pannel");
    pannel.classList.remove("hidden");

    setTerroristToEliminate(terrorist);
  }

  function eliminate() {
    setState((prev) => {
      return {
        ...prev,
        terrorists: list.map((t) => {
          if (t.name === terroristToEliminate.name) {
            t.status = "dead";
          }
          return t;
        }),
      };
    });

    const pannel = document.querySelector(".pannel");
    pannel.classList.add("hidden");
  }

  return (
    <>
      <table className="terrorists-table">
        <tbody>
          <tr className="header">
            <th>Image</th>
            <th>Name</th>
            <th>Organisation</th>
            <th>Atttacks</th>
            <th>Status</th>
            <th>Summary</th>
          </tr>
          {terrorists.map((terrorist, idx) => {
            return (
              <tr key={idx} onClick={() => openPanel(terrorist)}>
                <td>
                  <img
                    src={
                      terrorist?.imageUrl ||
                      "https://images.unsplash.com/photo-1769084644143-151aa0387167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                    }
                  />
                </td>
                <td>{terrorist?.name}</td>
                <td>{terrorist?.organization}</td>
                <td>{terrorist?.attacksCount}</td>
                <td>{terrorist?.status}</td>
                <td>{terrorist?.relationToIsraelSummary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pannel hidden">
        <label htmlFor="select">Choose weapon</label>
        <select id="select">
          <option value="gun" onClick={eliminate}>
            gun
          </option>
          <option value="knife" onClick={eliminate}>
            knife
          </option>
          <option value="bomb" onClick={eliminate}>
            bomb
          </option>
        </select>
      </div>
    </>
  );
}
