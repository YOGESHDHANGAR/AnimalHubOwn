import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearErrors, getAnimals } from "../Redux/actions/animalActions";
import "./Style/TopNav.css";
import { cowbreeds, buffalobreeds, categoryArr } from "../../Utility/arrays";

const TopNav = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState();
  const [milk, setmilk] = useState();
  const [radius, setradius] = useState();
  const [rate, setrate] = useState();
  const [breedArr, setbreedArr] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    event.target.name === categoryArr[1] || event.target.name === categoryArr[3]
      ? setbreedArr(cowbreeds)
      : setbreedArr(buffalobreeds);
  };
  const handleChangeMilk = (event) => setmilk(event.target.value);

  const handleChangeRadius = (event) => setradius(event.target.value);
  const handleChangeRate = (event) => setrate(event.target.value);

  const handleCheckBreedArr = (event) => {
    console.log("yes");
    const filter = breedArr.filter((elem) => {
      return elem.name !== event.target.name;
    });
    var t = parseInt(event.target.id);
    filter.push({
      id: t,
      name: event.target.name,
      value: event.target.value,
      check: event.target.checked,
    });
    const array = filter.sort((a, b) => a.id - b.id);
    console.log(array);

    setbreedArr(array);
  };

  const getQueriedData = async () => {
    dispatch(getAnimals(milk, category, radius, rate, breedArr));
    handleClose();
  };

  return (
    <>
      <div className="top_nav_bar">
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          fullscreen="true"
        >
          <Modal.Header>
            <Modal.Title style={{ color: "black", margin: "auto" }}>
              <h1>Make Filters</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/" method="post">
              <div className="row">
                <div className="col  col-lg-4 col-md-4  col-sm-4 mb-5 ">
                  <FormControl autoWidth="true" style={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">दूध</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={milk}
                      label="milk"
                      onChange={handleChangeMilk}
                    >
                      <MenuItem value={5}>0-5</MenuItem>
                      <MenuItem value={10}>5-10</MenuItem>
                      <MenuItem value={15}>10-15</MenuItem>
                      <MenuItem value={20}>15-20</MenuItem>
                      <MenuItem value={25}>20+</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col  col-lg-4 col-md-4 col-sm-4 mb-5">
                  <FormControl autoWidth style={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">दूरी</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={radius}
                      label="radius"
                      onChange={handleChangeRadius}
                    >
                      <MenuItem value={1}>30km</MenuItem>
                      <MenuItem value={2}>50km</MenuItem>
                      <MenuItem value={3}>70km</MenuItem>
                      <MenuItem value={4}>100km</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col  col-lg-4 col-md-4  col-sm-4  mb-5">
                  <FormControl autoWidth style={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">कीमत</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={rate}
                      label="price"
                      onChange={handleChangeRate}
                    >
                      <MenuItem value={30000}>30,000</MenuItem>
                      <MenuItem value={50000}>50,000</MenuItem>
                      <MenuItem value={75000}>75,000</MenuItem>
                      <MenuItem value={500000}>90,000</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="row">
                <div className="col  col-lg-4 col-md-6 col-sm-6 col-6  mb-3 animal_select_div">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <h3>पशु</h3>
                    </FormLabel>
                    <RadioGroup
                      aria-label="animal"
                      name="controlled-radio-buttons-group"
                      value={category}
                      onChange={handleChangeCategory}
                    >
                      {categoryArr.map((elem, index) => {
                        return (
                          <>
                            <FormControlLabel
                              value={index}
                              control={<Radio />}
                              name={elem}
                              label={elem}
                            />
                          </>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="col col-lg-4 col-md-6 col-sm-6 col-6 mb-3 chose_div">
                  {category === "1" || category === "3" ? (
                    <>
                      <h3>नस्ल</h3>
                      {breedArr.map((elem, index) => {
                        return (
                          <>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id={elem.id}
                                name={elem.name}
                                value={elem.index}
                                checked={elem.check}
                                index={elem.id}
                                onChange={handleCheckBreedArr}
                              />
                              <label htmlFor={`custom-checkbox-${elem.id}`}>
                                {elem.name}
                              </label>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : category === "0" || category === "2" ? (
                    <>
                      <h3>नस्ल</h3>
                      {breedArr.map((elem, index) => {
                        return (
                          <>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id={elem.id}
                                name={elem.name}
                                value={elem.value}
                                checked={elem.check}
                                index={elem.id}
                                onChange={handleCheckBreedArr}
                              />
                              <label htmlFor={`custom-checkbox-${elem.id}`}>
                                {elem.name}
                              </label>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
              style={{ background: "black", color: "white" }}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              style={{ background: "#0d6efd", color: "white" }}
              className="btn btn-primary ms-2"
              onClick={getQueriedData}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="top_nav_btn">
          <ButtonGroup variant="text" aria-label="text button group">
            <Button>स्थान</Button>
            <Button
              onClick={() => {
                // setpdState(false);
                handleShow();
              }}
            >
              खोज पशु
            </Button>
            <Button>विशेष पशु</Button>
          </ButtonGroup>

          <hr
            style={{
              color: "black",
              backgroundColor: "red",
              height: 5,
              marginTop: 0,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TopNav;
