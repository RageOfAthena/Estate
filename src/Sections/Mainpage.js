import styles from "./Mainpage.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  value,
  locationMatch,
  movmatch,
  priceMatch,
  BedMath,
  nameMatch,
} from "./DummyData.js";
import { useState } from "react";
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../Picture", false, /\.(png|jpe?g|svg)$/)
);
function Mainpage() {
  const [loc, onloc] = useState();
  const [when, onwhen] = useState();
  const [price, onprice] = useState();
  const [bed, onbed] = useState();
  const [arr, onarr] = useState(value.properties);
  const [search, onsearch] = useState();

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Search Property for Rent</h1>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Search for Property"
          className={styles.inputtext}
          value={search}
          onChange={(e) => {
            onsearch(e.target.value);
          }}
        />

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className={styles.magnify}
          onClick={(e) => {
            onarr(nameMatch(search, value.properties));
            onsearch("");
          }}
        >
          <title>search</title>
          <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
        </svg>
      </div>
      <div className={styles.filters}>
        <div className={styles.filterslocation}>
          <h3 className={styles.filterslocationtitle}>Location</h3>
          <select
            value={loc}
            onChange={(e) => {
              onloc(e.target.value);
            }}
          >
            <option value="">Choose a Option</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <div className={styles.filterswhen}>
          <h3 className={styles.filterswhentitle}>When</h3>
          <select
            onChange={(e) => {
              onwhen(e.target.value);
            }}
          >
            <option value="">Choose a Option</option>
            <option value="0-3">0-3</option>
            <option value="3-5">3-5</option>
            <option value="5-8">5-8</option>
            <option value="8-10">8-10</option>
            <option value="10-15">10-15</option>
          </select>
        </div>
        <div className={styles.filtersprice}>
          <h3 className={styles.filterspricetitle}>Price</h3>
          <select
            onChange={(e) => {
              onprice(e.target.value);
            }}
          >
            <option value="">Choose a Option</option>
            <option value="0-3">0-3</option>
            <option value="3-5">3-5</option>
            <option value="5-8">5-8</option>
            <option value="8-10">8-10</option>
            <option value="10-15">10-15</option>
          </select>
        </div>
        <div className={styles.filtersproperty}>
          <h3 className={styles.filterspropertytitle}>No.of Beds</h3>
          <select
            onChange={(e) => {
              onbed(e.target.value);
            }}
          >
            <option value="">Choose a Option</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button
          className={styles.submit}
          onClick={() => {
            let kim = [];
            if (loc) {
              kim.push(locationMatch(loc, value.properties));
            }
            if (when) {
              let y = when.split("-");
              kim.push(movmatch(y[0], y[1], value.properties));
            }
            if (price) {
              let z = price.split("-");
              kim.push(priceMatch(z[0], z[1], value.properties));
            }
            if (bed) {
              kim.push(BedMath(bed, value.properties));
            }
            kim = kim.reduce((p, c) => p.filter((e) => c.includes(e)));
            onarr(kim);

            if (!loc && !bed && !price && !when) {
              onarr(value.properties);
            }
          }}
        >
          Submit
        </button>
      </div>
      {arr.length === 0 && (
        <div className={styles.modify}>Please Modify the Search...</div>
      )}
      <div className={styles.grid}>
        {arr.map((e, i) => {
          return (
            <div className={styles.grid_contains}>
              <div className={styles.imagesa}>
                <LazyLoadImage
                  placeholderSrc={images[`${e.id}p.jpg`]}
                  effect="blur"
                  src={images[`${e.id}.jpg`]}
                  className={styles.limg}
                />
              </div>
              <h4 className={styles.title}>{e.name}</h4>
              <p className={styles.price}>${e.price}</p>
              <h5 className={styles.addr}>{e.addr}</h5>
              <h5 className={styles.mov}>{e.movIn} months</h5>
              <div className={styles.flex}>
                <div className={styles.bed}>
                  {e.bed} <span>beds</span>
                </div>
                <div className={styles.bath}>
                  {e.bath}
                  <span>baths</span>
                </div>
                <div className={styles.area}>
                  {e.size}
                  <span>sq m</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Mainpage;
