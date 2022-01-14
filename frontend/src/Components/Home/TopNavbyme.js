import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  ListItemText,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormGroup,
  OutlinedInput,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import "./Style/Navbar.css";
import { useDispatch } from "react-redux";
import { clearErrors, getAnimals } from "../Redux/actions/animalActions";
import { orgbreedArr } from "../../utils/stateArrays";
const TopNav = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  // const [pdState, setpdState] = useState(true);
  const [category, setcategory] = useState();
  const [milk, setmilk] = useState();
  const [radius, setradius] = useState();
  const [rate, setrate] = useState();
  const [breedArr, setbreedArr] = useState([...orgbreedArr]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangeCategory = (event) => {
    setcategory(event.target.value);
    console.log(event.target.value);
  };
  const handleChangeMilk = (event) => {
    setmilk(event.target.value);
    console.log(milk);
  };

  const handleChangeRadius = (event) => {
    setradius(event.target.value);
    console.log(radius);
  };
  const handleChangeRate = (event) => {
    setrate(event.target.value);
    console.log(rate);
  };

  const handleCheckBox = (event) => {
    console.log(event.target.checked);

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
    const queriedBreedArr = filter.sort((a, b) => a.id - b.id);
    console.log(queriedBreedArr);
    setbreedArr(queriedBreedArr);
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
                <div className="col  col-lg-4 col-md-4  mb-2">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <h3>दूध</h3>
                    </FormLabel>
                    <RadioGroup
                      aria-label="Milk"
                      name="controlled-radio-buttons-group"
                      value={milk}
                      onChange={handleChangeMilk}
                    >
                      <FormControlLabel
                        value={5}
                        control={<Radio />}
                        label="0-5 Liter"
                      />
                      <FormControlLabel
                        value={10}
                        control={<Radio />}
                        label="5-10 Liter"
                      />
                      <FormControlLabel
                        value={15}
                        control={<Radio />}
                        label="10-15 Liter"
                      />
                      <FormControlLabel
                        value={20}
                        control={<Radio />}
                        label="15-20 Liter"
                      />
                      <FormControlLabel
                        value={25}
                        control={<Radio />}
                        label="20-aboveLiter"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="col col-lg-4 col-md-4 mb-2">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <h3>दूरी</h3>
                    </FormLabel>
                    <RadioGroup
                      aria-label="radius"
                      name="controlled-radio-buttons-group"
                      value={radius}
                      onChange={handleChangeRadius}
                    >
                      <FormControlLabel
                        label="30km"
                        control={<Radio />}
                        value={1}
                      />
                      <FormControlLabel
                        label="50km"
                        control={<Radio />}
                        value={2}
                      />
                      <FormControlLabel
                        label="75km"
                        control={<Radio />}
                        value={3}
                      />
                      <FormControlLabel
                        label="100km"
                        control={<Radio />}
                        value={4}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="col  col-lg-4 col-md-4 mb-2">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <h3>कीमत</h3>
                    </FormLabel>
                    <RadioGroup
                      aria-label="rate"
                      name="controlled-radio-buttons-group"
                      value={rate}
                      onChange={handleChangeRate}
                    >
                      <FormControlLabel
                        label="20,000 तक "
                        control={<Radio />}
                        value={20000}
                      />
                      <FormControlLabel
                        label="30,000 तक "
                        control={<Radio />}
                        value={30000}
                      />
                      <FormControlLabel
                        label="50,000 तक "
                        control={<Radio />}
                        value={50000}
                      />
                      <FormControlLabel
                        label="80,000+"
                        control={<Radio />}
                        value={500000}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="row">
                <div className="col  col-lg-4 col-md-6">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <h3>पशु</h3>
                    </FormLabel>
                    <RadioGroup
                      aria-label="category"
                      name="controlled-radio-buttons-group"
                      value={category}
                      onChange={handleChangeCategory}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="भैंस"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="गाय"
                      />

                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label="पाड़ी"
                      />
                      <FormControlLabel
                        value={4}
                        control={<Radio />}
                        label="बछिया"
                      />
                      <FormControlLabel
                        value={5}
                        control={<Radio />}
                        label="भैंसा"
                      />
                      <FormControlLabel
                        value={6}
                        control={<Radio />}
                        label="बैल"
                      />
                      <FormControlLabel
                        value={7}
                        control={<Radio />}
                        label="अन्य पशु"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="col col-lg-4 col-md-6">
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
                            onChange={handleCheckBox}
                          />
                          <label htmlFor={`custom-checkbox-${elem.id}`}>
                            {elem.name}
                          </label>
                        </div>
                      </>
                    );
                  })}
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
