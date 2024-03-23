import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import {
  faHome,
  faPhone,
  faEnvelope,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import FontAwesomeIcon from "./FontAwesomeIcon";

Font.register({
  family: "Akatab",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/akatab/v7/VuJwdNrK3Z7gqJEPWIz5NIh-YA.ttf",
      fontWeight: "regular",
    },
    {
      src: "https://fonts.gstatic.com/s/akatab/v7/VuJzdNrK3Z7gqJE3rKXdPKNiaRpFvg.ttf",
      fontWeight: "500", // Font weight 500
    },
    {
      src: "https://fonts.gstatic.com/s/akatab/v7/VuJzdNrK3Z7gqJE3gKLdPKNiaRpFvg.ttf",
      fontWeight: "600", // Font weight 600
    },
    {
      src: "https://fonts.gstatic.com/s/akatab/v7/VuJzdNrK3Z7gqJE35KPdPKNiaRpFvg.ttf",
      fontWeight: "700", // Font weight 700
    },
    {
      src: "https://fonts.gstatic.com/s/akatab/v7/VuJzdNrK3Z7gqJE3-KDdPKNiaRpFvg.ttf",
      fontWeight: "800", // Font weight 800
    },
    {
      src: "https://fonts.gstatic.com/s/akatab/v7/VuJzdNrK3Z7gqJE33KHdPKNiaRpFvg.ttf",
      fontWeight: "900", // Font weight 900
    },
  ],
});
const styleSheet = (data) => {
  const backgroundColor =
    data && data.configuration ? data.configuration.color : "gray";
  const backgroundColor2 =
    data && data.configuration ? data.configuration.color2 : "lightgray";

  return {
    document: {},
    page: {},
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Akatab",
    },
    container2: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Akatab",
    },
    leftColumn: {
      maxWidth: "31%",
      backgroundColor: backgroundColor,
      padding: 30,
      flex: 1,
      height: "100%",
      color: "whitesmoke",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
    },
    rightColumn: {
      height: "100%",
      flex: 1,
    },
    header: {
      backgroundColor: backgroundColor2,
      padding: 15,
      position: "relative",
      top: 0,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    column1: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginRight: 25,
      width: "100%",
    },
    column3: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginLeft: -32,
      marginRight: -35,
      marginTop: 20,
      width: "100%",
    },
    column2: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      gap: 5,
      marginRight: 5,
      width: "50%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      marginLeft: -16,
      gap: 2,
    },
    rowGap: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      gap: 10,
      wordBreak: "break-all",
      marginRight: 20,
      alignItems: "center",
    },
    main: {
      padding: 30,
      color: "gray",
      backgroundColor: "white",
    },

    photo: {
      minWidth: 130,
      minHeight: 130,
      backgroundColor: "whitesmoke",
      borderRadius: "100%",
      padding: 0,
      marginBottom: 20,
      marginLeft: -5,
      overflow: "hidden",
    },
    title: {
      fontWeight: 500,
      fontSize: 20,
      marginBottom: 20,
    },
    name: {
      fontWeight: 800,
      fontSize: 30,
      marginBottom: 10,
    },

    role: { fontWeight: 400, fontSize: 20 },
    contact: {
      fontWeight: 400,
      fontSize: 14,
      marginBottom: 10,
    },
    jobTitle: {
      fontWeight: 400,
      fontSize: 20,
      marginBottom: 10,
      marginTop: -10,
    },
    company: { marginBottom: 10, fontSize: 14 },

    levelBarContainer: {
      marginTop: 5,
      marginBottom: 10,
      width: "70%",
      backgroundColor: "#f0f0f0",
      borderRadius: "50%",
      overflow: "hidden",
    },
    levelBar: {
      backgroundColor: "dark",
      height: 10,
      color: "#fff",
      textAlign: "center",
      lineHeight: "20px",
    },
    field: {
      marginBottom: 10,
    },
    text: {
      marginBottom: 4,
      fontSize: 13,
    },
    contact: {
      marginBottom: 0,
      fontSize: 11,
      color: "gray",
    },
    icon: {
      width: 13,
      height: 13,
      opacity: 0.5,
      color: "gray",
    },
    playWhite: {
      width: 13,
      height: 13,
      opacity: 0.5,
      color: "whitesmoke",
      marginTop: 7,
    },
    playBlack: {
      width: 13,
      height: 13,
      opacity: 0.5,
      color: "gray",
      marginTop: 7,
    },
    experienceContainer: {
      marginBottom: 27,
    },
    description: {
      fontSize: 13,
      textAlign: "justify",
    },
    summary: {
      marginBottom: 15,
      fontSize: 13,
      textAlign: "justify",
    },

    header2: {
      backgroundColor: backgroundColor2,
      padding: 15,
      position: "flex",
      top: 0,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: "20%",
    },
    bottomRow: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      flex: 1,
    },
    leftColumn2: {
      maxWidth: "69%",
    },
    rightColumn2: {
      maxWidth: "43%",
      backgroundColor: backgroundColor,
      padding: 30,
      color: "whitesmoke",
      justifyContent: "center",
    },
  };
};

function Photo({ data, styles }) {
  const findImage = () => {
    if (data.sex === "female") {
      return "../../public/female.png";
    } else {
      return "../../public/male.png";
    }
  };
  return (
    <View style={styles.photo}>
      <Image src={findImage()} style={{ top: 15 }} />
    </View>
  );
}

function Education({ data, styles }) {
  return (
    <View style={styles.field}>
      <Text style={styles.text}>{data.title}</Text>
      <Text style={styles.text}>{data.university}</Text>
      <Text style={styles.text}>
        {data.date} - {data.date2}
      </Text>
    </View>
  );
}

function Experience({ data, styles }) {
  return (
    <View style={styles.experienceContainer}>
      <Text style={styles.jobTitle}>{data.title}</Text>
      <Text style={{ ...styles.company, fontWeight: "500" }}>
        {data.company}{" "}
        <Text style={{ ...styles.company, fontWeight: "200" }}>
          | {data.date} - {data.date2}
        </Text>
      </Text>
      <Text style={styles.description}>{data.description}</Text>
    </View>
  );
}

function Skill({ data, styles }) {
  return (
    <View style={styles.skillContainer}>
      <Text style={styles.text}>
        {"\u2022"} {data}
      </Text>
    </View>
  );
}

function Language({ data, styles }) {
  const getLevelWidth = (level) => {
    switch (level) {
      case "low":
        return "33%";
      case "intermediate":
        return "66%";
      case "advanced":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <View style={styles.languageContainer}>
      <View>
        <Text style={styles.text}>{data.language}</Text>
        <View style={styles.levelBarContainer}>
          <View
            style={{
              ...styles.levelBar,
              width: getLevelWidth(data.level),
            }}
          />
        </View>
      </View>
    </View>
  );
}

const Cv = ({ data }) => {
  const styles = styleSheet(data);
  return data.configuration.type == "0" ? (
    <Document style={styles.document}>
      <Page style={styles.page}>
        <View style={styles.container}>
          {/* Left column */}
          <View style={styles.leftColumn}>
            <Photo data={data.personalInformation} styles={styles} />
            <View style={styles.field}>
              <View style={styles.row}>
                <FontAwesomeIcon faIcon={faPlay} style={styles.playWhite} />
                <Text style={styles.title}>EDUCATION</Text>
              </View>
              {data.education.map((value, index) => (
                <Education key={index} data={value} styles={styles} />
              ))}
            </View>
            <View style={styles.field}>
              <View style={styles.row}>
                <FontAwesomeIcon faIcon={faPlay} style={styles.playWhite} />
                <Text style={styles.title}>TECHNICAL SKILLS</Text>
              </View>
              {data.skills.map((value, index) => (
                <Skill key={index} data={value} styles={styles} />
              ))}
            </View>
            <View style={styles.field}>
              <View style={styles.row}>
                <FontAwesomeIcon faIcon={faPlay} style={styles.playWhite} />
                <Text style={styles.title}>LANGUAGES</Text>
              </View>
              {data.languages.map((value, index) => (
                <Language key={index} data={value} styles={styles} />
              ))}
            </View>
          </View>
          {/* Right column */}
          <View style={styles.rightColumn}>
            <View style={styles.header}>
              <View style={styles.column1}>
                <Text style={styles.name}>
                  {data.personalInformation.fullname.toUpperCase()}
                </Text>
                <Text style={styles.role}>{data.personalInformation.role}</Text>
              </View>
              <View style={styles.column2}>
                <View style={styles.rowGap}>
                  <FontAwesomeIcon faIcon={faHome} style={styles.icon} />
                  <Text style={styles.contact}>
                    {data.personalInformation.address}
                  </Text>
                </View>
                <View style={styles.rowGap}>
                  <FontAwesomeIcon faIcon={faPhone} style={styles.icon} />
                  <Text style={styles.contact}>
                    {data.personalInformation.phone}
                  </Text>
                </View>
                <View style={styles.rowGap}>
                  <FontAwesomeIcon faIcon={faEnvelope} style={styles.icon} />
                  <Text style={styles.contact}>
                    {data.personalInformation.email}
                  </Text>
                </View>
                <View style={styles.rowGap}>
                  <FontAwesomeIcon faIcon={faLinkedin} style={styles.icon} />
                  <Text style={styles.contact}>
                    {data.personalInformation.linkedn}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.main}>
              <View style={styles.field}>
                <View style={styles.row}>
                  <FontAwesomeIcon faIcon={faPlay} style={styles.playBlack} />
                  <Text style={styles.title}>SUMMARY</Text>
                </View>
                <Text style={styles.summary}>{data.summary}</Text>
              </View>
              <View style={styles.field}>
                <View style={styles.row}>
                  <FontAwesomeIcon faIcon={faPlay} style={styles.playBlack} />
                  <Text style={styles.title}>EXPERIENCE</Text>
                </View>
                {data.experience.map((value, index) => (
                  <Experience key={index} data={value} styles={styles} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  ) : (
    <Document style={styles.document}>
      <Page style={styles.page}>
        <View style={styles.container2}>
          {" "}
          {/* Upper Row */}
          <View style={styles.header2}>
            <View style={styles.column3}>
              <Photo data={data.personalInformation} styles={styles} />
            </View>
            <View style={styles.column1}>
              <Text style={styles.name}>
                {data.personalInformation.fullname.toUpperCase()}
              </Text>
              <Text style={styles.role}>{data.personalInformation.role}</Text>
            </View>
            <View style={styles.column2}>
              <View style={styles.rowGap}>
                <FontAwesomeIcon faIcon={faHome} style={styles.icon} />
                <Text style={styles.contact}>
                  {data.personalInformation.address}
                </Text>
              </View>
              <View style={styles.rowGap}>
                <FontAwesomeIcon faIcon={faPhone} style={styles.icon} />
                <Text style={styles.contact}>
                  {data.personalInformation.phone}
                </Text>
              </View>
              <View style={styles.rowGap}>
                <FontAwesomeIcon faIcon={faEnvelope} style={styles.icon} />
                <Text style={styles.contact}>
                  {data.personalInformation.email}
                </Text>
              </View>
              <View style={styles.rowGap}>
                <FontAwesomeIcon faIcon={faLinkedin} style={styles.icon} />
                <Text style={styles.contact}>
                  {data.personalInformation.linkedn}
                </Text>
              </View>
            </View>{" "}
          </View>
          {/* Lower Row */}
          <View style={styles.bottomRow}>
            {" "}
            <View style={styles.leftColumn2}>
              <View style={styles.main}>
                <View style={styles.field}>
                  <View style={styles.row}>
                    <FontAwesomeIcon faIcon={faPlay} style={styles.playBlack} />
                    <Text style={styles.title}>SUMMARY</Text>
                  </View>
                  <Text style={styles.summary}>{data.summary}</Text>
                </View>
                <View style={styles.field}>
                  <View style={styles.row}>
                    <FontAwesomeIcon faIcon={faPlay} style={styles.playBlack} />
                    <Text style={styles.title}>EXPERIENCE</Text>
                  </View>
                  {data.experience.map((value, index) => (
                    <Experience key={index} data={value} styles={styles} />
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.leftColumn}>
              <View>
                <View style={styles.field}>
                  <View style={styles.row}>
                    <FontAwesomeIcon faIcon={faPlay} style={styles.playWhite} />
                    <Text style={styles.title}>EDUCATION</Text>
                  </View>
                  {data.education.map((value, index) => (
                    <Education key={index} data={value} styles={styles} />
                  ))}
                </View>

                <View style={styles.field}>
                  <View style={styles.row}>
                    <FontAwesomeIcon faIcon={faPlay} style={styles.playWhite} />
                    <Text style={styles.title}>TECHNICAL SKILLS</Text>
                  </View>
                  {data.skills.map((value, index) => (
                    <Skill key={index} data={value} styles={styles} />
                  ))}
                </View>
                <View style={styles.field}>
                  <View style={styles.row}>
                    <FontAwesomeIcon faIcon={faPlay} style={styles.playWhite} />
                    <Text style={styles.title}>LANGUAGES</Text>
                  </View>
                  {data.languages.map((value, index) => (
                    <Language key={index} data={value} styles={styles} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Cv;
