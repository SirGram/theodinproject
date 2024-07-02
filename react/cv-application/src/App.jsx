import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./App.css";
import { PDFViewer } from "@react-pdf/renderer";
import Cv from "./components/Cv.jsx";
import {
  Configuration,
  Experience,
  PersonalInformation,
  Summary,
  Education,
  Skills,
  Languages,
} from "./components/editableFields.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faUser,
  faComment,
  faGraduationCap,
  faBriefcase,
  faTools,
  faGlobe,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const dummyData = {
    configuration: { type: "0", color: "#808080", color2: "#D3D3D3" },
    personalInformation: {
      fullname: "Emily Johnson",
      phone: "555-123-4567",
      email: "emily.johnson@example.com",
      sex: "female",
      role: "Full Stack Developer",
      address: "123 Main Street, Anytown, USA",
      linkedn: "linkedin.com/emilyjohnson",
    },
    summary:
      "I am a dedicated and creative full-stack developer with a passion for crafting user-friendly web applications. With over 6 years of experience in the industry, I have a strong background in JavaScript, React, Node.js, and relational databases. I thrive in collaborative environments and am always eager to learn new technologies.",
    education: [
      {
        title: "Bachelor of Science in Computer Science",
        university: "University of Technology",
        date: "2014-09",
        date2: "2018-05",
      },
      {
        title: "Master of Science in Software Engineering",
        university: "Tech Institute",
        date: "2018-09",
        date2: "2020-05",
      },
    ],
    experience: [
      {
        title: "Software Developer",
        company: "Innovative Solutions LLC",
        date: "2020-07",
        date2: "2023-12",
        description:
          "At Innovative Solutions LLC, I worked on developing and maintaining web applications for various clients. I collaborated with a team of developers and designers to deliver high-quality software solutions that met client requirements.",
      },
      {
        title: "Full Stack Engineer Intern",
        company: "Tech Startup X",
        date: "2019-06",
        date2: "2019-12",
        description:
          "During my internship at Tech Startup X, I contributed to the development of a new web application from inception to deployment. I gained hands-on experience with modern web technologies like React, Node.js, and MongoDB.",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "HTML5",
      "CSS3",
      "Express.js",
      "MongoDB",
      "SQL",
      "Git",
    ],
    languages: [
      { language: "English", level: "advanced" },
      { language: "Spanish", level: "intermediate" },
    ],
  };

  const [data, setData] = useState(dummyData);
  const [key, setKey] = useState(0);
  const [section, setSection] = useState("personalInformation");
  const [isHidden, setIsHidden] = useState(false);
  function changeSection(newSection) {
    if (newSection !== section) {
      setIsHidden(true);
      setTimeout(() => {
        setSection(newSection);
        setIsHidden(false);
      }, 300);
    }
  }

  function handleInputChange(sectionName, sectionData) {
    setData((prevData) => ({
      ...prevData,
      [sectionName]: sectionData,
    }));
    setKey((prevKey) => prevKey + 1);
  }
  console.log(data.configuration.type);

  return (
    <div className="container">
      <div className="flex-container">
        <div className="left">
          <h2>CV App</h2>{" "}
          <div className="field-container">
            <div className="field-selector-container">
              <div className="field-selector">
                <button onClick={() => changeSection("configuration")}>
                  <FontAwesomeIcon icon={faCog} className="custom-icon" />
                </button>{" "}
              </div>
              <div className="field-selector">
                <button onClick={() => changeSection("personalInformation")}>
                  <FontAwesomeIcon icon={faUser} className="custom-icon" />
                </button>
                <button onClick={() => changeSection("summary")}>
                  <FontAwesomeIcon icon={faComment} className="custom-icon" />
                </button>
                <button onClick={() => changeSection("education")}>
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="custom-icon"
                  />
                </button>
                <button onClick={() => changeSection("experience")}>
                  <FontAwesomeIcon icon={faBriefcase} className="custom-icon" />
                </button>
                <button onClick={() => changeSection("skills")}>
                  <FontAwesomeIcon icon={faTools} className="custom-icon" />
                </button>
                <button onClick={() => changeSection("languages")}>
                  <FontAwesomeIcon icon={faGlobe} className="custom-icon" />
                </button>
              </div>
              <div className="field-selector">
                <PDFDownloadLink
                  document={<Cv data={data} />}
                  fileName="/your_cv.pdf"
                  style={{
                    borderRadius: "50%",
                    height: "3rem",
                    width: "3rem",
                    backgroundColor: "lightcoral",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className="custom-icon"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className="custom-icon"
                      />
                    )
                  }
                </PDFDownloadLink>
              </div>{" "}
            </div>

            <div className={`fields ${isHidden ? "hidden" : ""}`}>
              {" "}
              {section === "configuration" && (
                <Configuration
                  onChange={(sectionData) =>
                    handleInputChange("configuration", sectionData)
                  }
                  data={data.configuration}
                />
              )}
              {section === "personalInformation" && (
                <PersonalInformation
                  onChange={(sectionData) =>
                    handleInputChange("personalInformation", sectionData)
                  }
                  data={data.personalInformation}
                />
              )}
              {section === "summary" && (
                <Summary
                  onChange={(sectionData) =>
                    handleInputChange("summary", sectionData)
                  }
                  data={data.summary}
                />
              )}
              {section === "education" && (
                <Education
                  onChange={(sectionData) =>
                    handleInputChange("education", sectionData)
                  }
                  data={data.education}
                />
              )}
              {section === "experience" && (
                <Experience
                  onChange={(sectionData) =>
                    handleInputChange("experience", sectionData)
                  }
                  data={data.experience}
                />
              )}
              {section === "skills" && (
                <Skills
                  onChange={(sectionData) =>
                    handleInputChange("skills", sectionData)
                  }
                  data={data.skills}
                />
              )}
              {section === "languages" && (
                <Languages
                  onChange={(sectionData) =>
                    handleInputChange("languages", sectionData)
                  }
                  data={data.languages}
                />
              )}
            </div>
          </div>
        </div>{" "}
        <div className="right" style={{ padding: "1rem" }}>
          <PDFViewer
            key={key}
            showToolbar={false}
            style={{
              position: "relative",
              height: "92vh",
              width: "67vh",
              backgroundColor: "white",
              boxSizing: "border-box",
            }}
          >
            <Cv data={data} />
          </PDFViewer>
        </div>
      </div>{" "}
      <footer>
        <p>
          <a href="https://github.com/SirGram" target="_blank">
            SirGram
          </a>{" "}
          2024
        </p>
      </footer>
    </div>
  );
}

export default App;
