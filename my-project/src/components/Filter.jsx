import { terrorists } from "../assets/data/terrorists_data";

export function Filter({ setState }) {
  const filterBy = {
    name: "",
    attacks: "",
    status: "",
  };

  function handleFilterChange() {
    if (filterBy.name !== "") {
      setState((prev) => {
        return {
          ...prev,
          terrorists: filterByName(terrorists, filterBy.name),
        };
      });
    } else if (filterBy.attacks !== "") {
      setState((prev) => {
        return {
          ...prev,
          terrorists: filterByAttacks(terrorists, filterBy.attacks),
        };
      });
    } else if (filterBy.status) {
      setState((prev) => {
        return {
          ...prev,
          terrorists: filterByStatus(terrorists, filterBy.status),
        };
      });
    } else if (filterBy.name === "" && filterBy.attacks === "") {
      setState((prev) => {
        return {
          ...prev,
          terrorists: terrorists,
        };
      });
    }
  }

  function filterByName(terrorists, name) {
    return terrorists.filter((terrorist) => {
      return terrorist.name.toLowerCase().includes(name.toLowerCase())
    });
  }

  function filterByAttacks(terrorists, num) {
    return terrorists.filter((terrorist) => {
      return terrorist.attacksCount >= +num;
    });
  }

  function filterByStatus(terrorists, status) {
    return terrorists.filter((terrorist) => {
      return terrorist.status === status;
    });
  }

  function handlechange(ev) {
    const { name, value } = ev.target;
    filterBy[name] = value;
    handleFilterChange();
  }

  function hundleSelectChange(ev) {
    filterBy.status = ev.target.value;
    handleFilterChange();
  }

  function findMostDangerous() {
    let attacks = 0 
    let mostDangerous = ''
    terrorists.forEach(terrorist => {
        if (terrorist.attacksCount > attacks &&
            terrorist.status === 'active' &&
            terrorist.imageUrl
        ) {
            attacks = terrorist.attacksCount
            mostDangerous = terrorist
        }
    })

    return setState( prev => {
        return {...prev, terrorists : [mostDangerous]}
    })
  }

  return (
    <div className="filter">
      <input
        onChange={handlechange}
        type="text"
        name="name"
        placeholder="search by name"
      />
      <input
        onChange={handlechange}
        type="text"
        name="attacks"
        placeholder="search by attacks"
      />

      <label htmlFor="select">Status filter:</label>
      <select name="select" id="select" onClick={hundleSelectChange}>
        <option value="">all</option>
        <option value="active">Active</option>
        <option value="quiet">Quiet</option>
        <option value="dead">Dead</option>
        <option value="agent">Israeli agent</option>
      </select>
      <button className="most-dangerous" onClick={findMostDangerous}>Find Most dangerous</button>
    </div>
  );
}
