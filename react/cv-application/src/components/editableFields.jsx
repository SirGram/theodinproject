import "../styles/fields.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Save = ({ saveData }) => {
  return (
    <div className="save-container">
      <button className="save" onClick={saveData}>
        Save
      </button>
    </div>
  );
};
const NewItem = ({ text, onClick }) => {
  return (
    <button className="new-item" onClick={onClick}>
      {text}
    </button>
  );
};
const LayoutIcon = () => {
  return (
    <div className="a4-icon">
      <div className="left-column"></div>
      <div className="right-column">
        <div className="row"></div>
        <div className="row"></div>
      </div>
    </div>
  );
};
const LayoutIcon2 = () => {
  return (
    <div className="a4-icon2">
      <div className="upper-div"></div>
      <div className="lower-div">
        <div className="left-column"></div>
        <div className="right-column">
          <div className="row"></div>
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

function Configuration({ onChange, data }) {
  const [configuration, setConfiguration] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfiguration((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const saveData = () => {
    onChange(configuration);
  };
  return (
    <div id="configuration" className="field">
      <div className="field-info">
        <label htmlFor="colorPicker" style={{ textAlign: "center" }}>
          Colors
        </label>
        <div className="row">
          <input
            type="color"
            id="colorPicker"
            name="color"
            onChange={(e) => handleInputChange(e)}
            value={configuration.color}
          />
          <input
            type="color"
            id="colorPicker2"
            name="color2"
            onChange={(e) => handleInputChange(e)}
            value={configuration.color2}
          />
        </div>
      </div>
      <div className="field-info">
        <label htmlFor="row" style={{ textAlign: "center" }}>
          {" "}
          Layout
        </label>
        <div className="row">
          <input
            type="radio"
            id="type0"
            name="type"
            value={0}
            onChange={(e) => handleInputChange(e)}
            checked={configuration.type == "0"}
          />
          <label htmlFor="type0" className="radio-label">
            {" "}
            <LayoutIcon />
          </label>

          <input
            type="radio"
            id="type1"
            name="type"
            value={1}
            onChange={(e) => handleInputChange(e)}
            checked={configuration.type == "1"}
          />
          <label htmlFor="type1" className="radio-label">
            {" "}
            <LayoutIcon2 />
          </label>
        </div>
        <Save saveData={saveData} />
      </div>
    </div>
  );
}

function PersonalInformation({ onChange, data }) {
  const [personalInformation, setPersonalInformation] = useState(data);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInformation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const saveData = () => {
    onChange(personalInformation);
  };

  return (
    <>
      <div id="personal-information" className="field">
        <div className="field-info">
          <div className="row">
            <input
              type="radio"
              id="male"
              name="sex"
              value="male"
              onChange={(e) => handleInputChange(e)}
              checked={personalInformation.sex === "male"}
            />
            <label htmlFor="male" className="radio-label">
              {" "}
              <FontAwesomeIcon icon={faMars} className="sex-icon" />
            </label>

            <input
              type="radio"
              id="female"
              name="sex"
              value="female"
              onChange={(e) => handleInputChange(e)}
              checked={personalInformation.sex === "female"}
            />
            <label htmlFor="female" className="radio-label">
              <FontAwesomeIcon icon={faVenus} className="sex-icon" />
            </label>
          </div>
          <label htmlFor="fullname">Full Name</label>
          <input
            name="fullname"
            type="text"
            id="fullname"
            onChange={(e) => handleInputChange(e)}
            value={personalInformation.fullname}
          />
          <label htmlFor="role">Role</label>
          <input
            name="role"
            type="role"
            id="role"
            onChange={(e) => handleInputChange(e)}
            value={personalInformation.role}
          />
          <label htmlFor="phone">Phone Number</label>
          <input
            name="phone"
            type="text"
            id="phone"
            onChange={(e) => handleInputChange(e)}
            value={personalInformation.phone}
          />
          <label htmlFor="phone">Address</label>
          <input
            name="address"
            type="text"
            id="address"
            onChange={(e) => handleInputChange(e)}
            value={personalInformation.address}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={(e) => handleInputChange(e)}
            value={personalInformation.email}
          />
          <label htmlFor="Linkedn">Linkedn</label>
          <input
            name="linkedn"
            type="text"
            id="linkedn"
            onChange={(e) => handleInputChange(e)}
            value={personalInformation.linkedn}
          />
        </div>{" "}
        <Save saveData={saveData} />
      </div>
    </>
  );
}

function Summary({ onChange, data }) {
  const [summary, setSummary] = useState(data);
  const saveData = () => {
    onChange(summary);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSummary(value);
  };
  return (
    <div id="summary" className="field">
      <div className="field-top"></div>
      <div className="field-info">
        <label htmlFor="summary">Summary</label>
        <textarea
          name="summary"
          type="text"
          id="input-summary"
          onChange={(e) => handleInputChange(e)}
          value={summary}
        />
      </div>
      <Save saveData={saveData} />
    </div>
  );
}

function Education({ onChange, data }) {
  const [education, setEducation] = useState(data);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...education];
    const newObject = { ...newData[index], [name]: value };
    newData[index] = newObject;
    setEducation(newData);
  };
  const [showInfo2Array, setShowInfo2Array] = useState(
    Array(data.length).fill(false)
  );

  const handleButton2Change = (index) => {
    const newShowInfo2Array = [...showInfo2Array];
    newShowInfo2Array[index] = !newShowInfo2Array[index];
    setShowInfo2Array(newShowInfo2Array);
  };
  const handleDelete = (e, index) => {
    const newData = [...education];
    newData.splice(index, 1);
    setEducation(newData);
  };
  const addNewItem = () => {
    const newData = [...education];
    const newObject = {
      title: "New Education",
      university: "",
      date: "",
      date2: "",
    };
    newData.push(newObject);
    setEducation(newData);
  };
  const saveData = () => {
    onChange(education);
  };
  return (
    <div id="education" className="field">
      <div className="field-top"></div>
      <div className={"field-info"}>
        <label htmlFor={`title`}>Education</label>
        {education.map((el, index) => (
          <div key={index} className="wrapper">
            {showInfo2Array[index] ? (
              <div className="subfield2">
                <label htmlFor={`title`}>Degree Title</label>
                <input
                  name={`title`}
                  type="text"
                  onChange={(e) => handleInputChange(e, index)}
                  value={el.title}
                />
                <label htmlFor={`university`}>University</label>
                <input
                  name={`university`}
                  type="text"
                  onChange={(e) => handleInputChange(e, index)}
                  value={el.university}
                />
                <label htmlFor={`date`}>Start Date</label>
                <input
                  name={`date`}
                  type="month"
                  onChange={(e) => handleInputChange(e, index)}
                  value={el.date}
                />
                <label htmlFor={`date2`}>End Date</label>
                <input
                  name={`date2`}
                  type="month"
                  onChange={(e) => handleInputChange(e, index)}
                  value={el.date2}
                />
                <button
                  onClick={() => handleButton2Change(index)}
                  className="collapse"
                >
                  Collapse
                </button>{" "}
              </div>
            ) : (
              <>
                <div className={"row"}>
                  <button
                    onClick={() => handleButton2Change(index)}
                    className="press-field"
                  >
                    {el.title}
                  </button>{" "}
                  <button
                    onClick={(e) => handleDelete(e, index)}
                    className="trash-icon"
                  >
                    <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        <div className="row">
          <NewItem text="Add Education" onClick={addNewItem} />
          <Save saveData={saveData} />
        </div>
      </div>
    </div>
  );
}
function Experience({ onChange, data }) {
  const [experience, setExperience] = useState(data);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...experience];

    const newObject = { ...newData[index], [name]: value };
    newData[index] = newObject;
    setExperience(newData);
  };
  const [showInfo2Array, setShowInfo2Array] = useState(
    Array(data.length).fill(false)
  );

  const handleButton2Change = (index) => {
    const newShowInfo2Array = [...showInfo2Array];
    newShowInfo2Array[index] = !newShowInfo2Array[index];
    setShowInfo2Array(newShowInfo2Array);
  };
  const handleDelete = (e, index) => {
    const newData = [...experience];

    newData.splice(index, 1);
    setExperience(newData);
  };
  const addNewItem = () => {
    const newData = [...experience];

    const newObject = {
      title: "New Experience",
      university: "",
      date: "",
      date2: "",
    };
    newData.push(newObject);
    setExperience(newData);
  };
  const saveData = () => {
    onChange(experience);
  };
  return (
    <div id="experience" className="field">
      <div className="field-top"></div>
      <div className={"field-info"}>
        <label htmlFor={`title`}>Experience</label>
        {experience.map((el, index) => (
          <div key={index} className="wrapper">
            {showInfo2Array[index] ? (
              <div className="subfield2">
                <label htmlFor={`title`}>Job Name</label>
                <input
                  name={`title`}
                  type="text"
                  onChange={(e) => handleInputChange(e, index)}
                  value={el.title}
                />
                <label htmlFor={`company`}>Company</label>
                <input
                  name={`university`}
                  type="text"
                  onChange={(e) => handleInputChange(e, index)}
                  value={el.company}
                />
                <label htmlFor={`date`}>Start Date</label>
                <input
                  name={`date`}
                  type="month"
                  onChange={(e) => handleInputChange(e, index)}
                  value={el.date}
                />
                <label htmlFor={`date2`}>End Date</label>
                <input
                  name={`date2`}
                  type="month"
                  onChange={(e) => handleInputChange(e, index)}
                  value={el.date2}
                />
                <button
                  onClick={() => handleButton2Change(index)}
                  className="collapse"
                >
                  Collapse
                </button>{" "}
              </div>
            ) : (
              <>
                <div className={"row"}>
                  <button
                    onClick={() => handleButton2Change(index)}
                    className="press-field"
                  >
                    {el.title}
                  </button>{" "}
                  <button
                    onClick={(e) => handleDelete(e, index)}
                    className="trash-icon"
                  >
                    <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        <div className="row">
          <NewItem text="Add Experience" onClick={addNewItem} />
          <Save saveData={saveData} />
        </div>
      </div>
    </div>
  );
}

function Skills({ onChange, data }) {
  const [skills, setSkills] = useState(data);
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const newData = [...skills];
    newData[index] = value;
    setSkills(newData);
  };

  const addNewItem = () => {
    const newData = [...skills];

    const newObject = "New Skill";
    newData.push(newObject);
    setSkills(newData);
  };
  const handleDelete = (e, index) => {
    const newData = [...data];

    newData.splice(index, 1);
    onChange(newData);
  };
  const saveData = () => {
    onChange(skills);
  };
  return (
    <div id="skills" className="field">
      <div className="field-top"></div>
      <div className="field-info">
        <label htmlFor="">Skills</label>
        {skills.map((el, index) => (
          <div key={index} className="subfield">
            <input
              name="skill"
              type="text"
              onChange={(e) => handleInputChange(e, index)}
              value={el}
            />
            <button onClick={(e) => handleDelete(e, index)}>
              <FontAwesomeIcon icon={faTrash} className="trash-icon" />
            </button>
          </div>
        ))}
        <div className="row">
          <NewItem text="Add Skill" onClick={addNewItem} />
          <Save saveData={saveData} />
        </div>
      </div>
    </div>
  );
}
function Languages({ onChange, data }) {
  const [languages, setLanguages] = useState(data);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...languages];
    const newObject = { ...newData[index], [name]: value };
    newData[index] = newObject;
    setLanguages(newData);
  };

  const addNewItem = () => {
    const newData = [...languages];

    const newObject = { language: "New Item", level: "low" };
    newData.push(newObject);
    setLanguages(newData);
  };
  const handleDelete = (e, index) => {
    const newData = [...languages];

    newData.splice(index, 1);
    setLanguages(newData);
  };
  const saveData = () => {
    onChange(languages);
  };
  return (
    <div id="languages" className="field">
      <div className="field-top"></div>
      <div className="field-info">
        <label>Languages</label>
        {languages.map((el, index) => (
          <div key={index}>
            <div className="language-row">
              <input
                type="text"
                id={`language-${index}`}
                name={`language`}
                value={el.language}
                onChange={(e) => handleInputChange(e, index)}
              />
              <select
                id={`level-${index}`}
                name={`level`}
                value={el.level}
                onChange={(e) => handleInputChange(e, index)}
              >
                <option value="low">Low</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <button onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} className="trash-icon" />
              </button>
            </div>
          </div>
        ))}
        <div className="row">
          <NewItem text="Add Language" onClick={addNewItem} />
          <Save saveData={saveData} />
        </div>
      </div>
    </div>
  );
}
export {
  PersonalInformation,
  Experience,
  Education,
  Summary,
  Skills,
  Languages,
  Configuration,
};
