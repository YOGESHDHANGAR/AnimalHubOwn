import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";
import "./Style/Sell.css";
import ImgCow from "../../Jersey-cow.jpg";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector, useDispatch } from "react-redux";
import { createAnimal } from "../Redux/actions/animalActions";

export const Sell = () => {
  const dispatch = useDispatch();
  const [animal, setanimal] = useState("");
  const [b, setb] = useState("");
  const [G, setG] = useState("");
  const [breed, setbreed] = useState("");
  const [milk, setmilk] = useState(0);
  const [milkcurrent, setmilkcurrent] = useState(0);
  // const [buffalowbreed, setbuffalowbreed] = useState("");
  const [products, setProducts] = useState({
    file1: "",
    file2: "",
    file3: "",
    file4: "",
    file: [],
    filepreview: null,
  });

  const otherAnimal = ["Horse", "goat", "malegoat", "horsefemale", "malehorse"];
  const breeds = [
    "Murrah",
    "Haryani",
    "Desi",
    "Kali",
    "Kundi",
    "Jaffrabadi",
    "Banni",
    "Kumbbi",
    "Kunni",
    "Nili Ravi",
    "Bhandawari",
    "Gujrati",
    "Godhawari",
    "Surti",
    "Mehrana",
    "Pandharpuri",
    "Nagpuri",
    "Gir",
    "Sahival",
    "Desi Gay",
    "Hafestiesian",
    "Jersey",
    "American",
    "Dogali",
    "Rathi",
    "Tharparkar",
    "Haryani Gay",
    "Marwari",
    "Kankrey",
    "Kapila",
    "Ayrshire",
    "Hardhenu",
    "Nagori",
    "Gujrati Gay",
    "Res sindhi",
    "Deoni",
    "Red Dane",
    "Brown swiss",
    "Sanchori",
    "Malvi",
  ];

  const handleChangeB = (event) => {
    setb(event.target.value);
  };

  const handleChangeAnimal = (event) => {
    // console.log(event.target.value);
    setanimal(event.target.value);
  };
  const handleMilkCapacity = (event) => setmilk(event.target.value);
  const handleMilkCurrent = (event) => setmilkcurrent(event.target.value);
  const handleG = (event) => {
    setG(event.target.value);
  };
  const handleBreed = (event) => {
    setbreed(event.target.value);
  };
  // const handleBuffalowBreed = (event) => {
  //   setbuffalowbreed(event.target.value);
  // };
  const handleInputImage = (event) => {
    // const { name, value } = event.target;
    // console.log(event.target.files);
    // console.log(name + " " + value);
    setProducts({
      ...products,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const submitData = async () => {
    // await axios
    //   .post("http://localhost:4000/api/v1/animal/new", {
    //     category:animal,
    //     caughNumber: b,
    //     isPregnent: G,
    //     milkCapacity: milk,
    //     milkCurrent: milkcurrent,
    //   })
    //   .then(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    const animalData = {
      category: animal,
      caughNumber: b,
      isPregnent: G,
      milkCapacity: milk,
      milkCurrent: milkcurrent,
    };

    dispatch(createAnimal(animalData));
  };

  // const cancleImg = (event) => {
  //    URL.revokeObjectURL(event.name)
  //   setProducts(products);
  // };

  // console.log(products);

  return (
    <>
      <div className="container mt-3 text-center form_div pt-3 text-center">
        <h1>हमें अपने पशु के बारे में बताएं</h1>
        <form action="">
          <div className="row mt-4">
            <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
              <FormControl sx={{ minWidth: 230 }}>
                <InputLabel id="demo-simple-select-label">पशु चुने</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={animal}
                  label="Select Animal"
                  onChange={handleChangeAnimal}
                >
                  <MenuItem name="cow" value="cow">
                    गाय
                  </MenuItem>
                  <MenuItem value="femalebuffalow">भेंस</MenuItem>
                  <MenuItem value="malebuffalow">भैंसा</MenuItem>
                  <MenuItem value="ox">बैल</MenuItem>
                  <MenuItem value="other">अन्य पशु</MenuItem>
                </Select>
              </FormControl>
            </div>
            {animal === "femalebuffalow" || animal === "cow" ? (
              <>
                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-label">ब्यात</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={b}
                      label="Select Animal"
                      onChange={handleChangeB}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-label">गाबीन</InputLabel>
                    <Select
                      labelId="गाबीन"
                      id="demo-simple-select"
                      value={G}
                      label="Age"
                      onChange={handleG}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <TextField
                    id="outlined-basic"
                    label="अभी का दूध (प्रति-दिन)"
                    variant="outlined"
                    type="number"
                    value={milkcurrent}
                    onChange={handleMilkCurrent}
                  />
                </div>

                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <TextField
                    id="outlined-basic"
                    label="दूध की क्षमता (प्रति दिन)"
                    variant="outlined"
                    type="number"
                    value={milk}
                    onChange={handleMilkCapacity}
                  />
                </div>
                {animal === "cow" ? (
                  <>
                    <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                      <FormControl sx={{ minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-label">
                          breed
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={breed}
                          label="Age"
                          onChange={handleBreed}
                        >
                          {breeds.slice(17, 40).map((elem) => {
                            return <MenuItem value={elem}>{elem}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                      <FormControl sx={{ minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-label">
                          breed
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={breed}
                          label="Age"
                          onChange={handleBreed}
                        >
                          {breeds.slice(0, 17).map((elem) => {
                            return <MenuItem value={elem}>{elem}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                )}
              </>
            ) : animal === "ox" || animal === "malebuffalow" ? (
              <>
                {animal === "ox" ? (
                  <>
                    <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                      <FormControl sx={{ minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-label">
                          breed
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={breed}
                          label="Age"
                          onChange={handleBreed}
                        >
                          {breeds.slice(17, 40).map((elem) => {
                            return <MenuItem value={elem}>{elem}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                      <FormControl sx={{ minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-label">
                          breed
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={breed}
                          label="Age"
                          onChange={handleBreed}
                        >
                          {breeds.slice(0, 17).map((elem) => {
                            return <MenuItem value={elem}>{elem}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                )}
              </>
            ) : animal === "other" ? (
              <>
                <div className="col col-lg-3 col-md-4  col-sm-6 col-12 mb-3">
                  <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-label">breed</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={G}
                      label="Age"
                      onChange={handleG}
                    >
                      {otherAnimal.map((elem) => {
                        return <MenuItem value={elem}>{elem}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </div>
              </>
            ) : null}

            <div className="col col-lg-3 col-md-4  col-sm-4 col-12 mb-3">
              <TextField
                id="outlined-basic"
                label="रेट (₹)(सही रेट डालें, उससे ज़्यादा ग्राहक कॉल करते हैं) "
                variant="outlined"
                type="number"
              />
            </div>
          </div>

          {/* Image Input */}
          <div className="row">
            <div className="col col-lg-3 col-md-3 col-sm-3 col-6 mt-2 mb-2 ms-2 image_upload_div">
              <div className="container">
                <input
                  type="file"
                  name="upload_file"
                  className="form-control btn mt-5"
                  id="file1"
                  accept="image/*"
                  onChange={handleInputImage}
                />
                {products.filepreview !== null ? (
                  <CancelIcon className="cancle_image" name="upload_file" />
                ) : null}

                <div className="label-holder">
                  <label htmlFor="file1" className="label">
                    <i className="material-icons">
                      {products.filepreview !== null ? (
                        <>
                          <img
                            className="previewimg"
                            src={products.filepreview}
                            alt="UploadImage"
                          />
                        </>
                      ) : (
                        <>
                          <img src={ImgCow} alt=".." className="before_input" />
                        </>
                      )}
                    </i>
                  </label>
                </div>
              </div>
            </div>

            <div className="col col-lg-3 col-md-3 col-sm-3 col-6 mt-2 mb-2 ms-2 image_upload_div">
              <div className="container">
                <input
                  type="file"
                  name="file2"
                  className="form-control btn mt-5"
                  id="file1"
                  accept="image/*"
                  onChange={handleInputImage}
                />
                {products.filepreview !== null ? (
                  <CancelIcon className="cancle_image" name="upload_file" />
                ) : null}

                <div className="label-holder">
                  <label htmlFor="file1" className="label">
                    <i className="material-icons">
                      {products.filepreview !== null ? (
                        <>
                          <img
                            className="previewimg"
                            src={products.filepreview}
                            alt="UploadImage"
                          />
                        </>
                      ) : (
                        <>
                          <img src={ImgCow} alt=".." className="before_input" />
                        </>
                      )}
                    </i>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <Button className="btn_submit mb-5" onClick={submitData}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
export default Sell;
