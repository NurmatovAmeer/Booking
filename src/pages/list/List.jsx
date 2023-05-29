import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination || "");
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options || null);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [limit,setLimit] = useState(5)
  const [dates, setDates] = useState(location.state.dates ||  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const {data,loading,error,reFetch} = useFetch(`/hotels?city=${destination.toLowerCase()}&min=${min - 1 || 1}&max=${max + 1 || 100000}&limit=${limit}`)

   const handleOption = (name,e) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: parseInt(e.target.value)
      };
    });
  };

  const {dispatch} = useContext(SearchContext)

  useEffect(() => {
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
  },[destination,dates,options])

  const handleClick = () => {
    reFetch();
  }
  const changeLimit = (operation) => {
    if(operation === "more"){
    setLimit(limit + 5)
    }else if(operation === "less" && limit % 5 == 0 && limit > 5){
    setLimit(limit - 5)
    }else{
      setLimit(5)
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} onChange={e => setDestination(e.target.value)} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    onChange={(e) => handleOption("adult",e)}
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    onChange={(e) => handleOption("children",e)}
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    onChange={(e) => handleOption("room",e)}
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
            <div className="display_flex">
            <button onClick={() => changeLimit("more")}>see more +5</button>
            <button onClick={() => changeLimit("less")}>see less -5</button>
            </div>
            <button onClick={() => changeLimit("restart")}>restart count</button>
          </div>
          <div className="listResult">
            {loading ? "Loading please wait" : <>
            {data.map(item => (
            <SearchItem key={item._id} item={item}/>
            ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
