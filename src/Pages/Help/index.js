import React from "react";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "../../Assets/twitterIcon.png";
import DiscordIcon from "../../Assets/discordIcon.png";
import WhatsappRoundedIcon from "@mui/icons-material/WhatsappRounded";
import { Button, Link } from "@mui/material";
import "./styles.css";

const HomeScreen = () => {
  let faqsData = [
    {
      question: "Question 1",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
    {
      question: "Question 2",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
    {
      question: "Question 3",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
    {
      question: "Question 4",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
    {
      question: "Question 5",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
    {
      question: "Question 6",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
  ];
  let socialIcons = [
    {
      icon: <FacebookRoundedIcon sx={{ fontSize: 35, color: "#4267B2 " }} />,
      link: "#",
    },
    {
      icon: <WhatsappRoundedIcon sx={{ fontSize: 35, color: "#075e54	 " }} />,
      link: "#",
    },
    { icon: TwitterIcon, link: "#" },
    { icon: DiscordIcon, link: "#" },
  ];
  return (
    <AppLayout>
      <div className="upperDiv">
        <div style={{ margin: "30px 0px" }} className="faqs-section">
          <Typography sx={{ marginY: "20px" }} variant="h6">
            Frequently Asked Questions (FAQs)
          </Typography>
          {faqsData.map((obj, index) => {
            return (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{obj.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{obj.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
        <div style={{ margin: "20px 0px" }} className="socials">
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "14px",
              textAlign: "center !important",
            }}
          >
            If you have any other questions feel free to reach us out at any of
            the following social platforms
          </Typography>
          <div className="socialIcons">
            {socialIcons.map((obj, index) => {
              if (index <= 1) {
                return (
                  <Button key={index}>
                    <Link href={obj.link}>{obj.icon}</Link>
                  </Button>
                );
              } else {
                return (
                  <Button key={index}>
                    <Link href={obj.link}>
                      <img
                        style={{ width: "35px", height: "35px" }}
                        src={obj.icon}
                        alt={obj.icon}
                      />
                    </Link>
                  </Button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomeScreen;
