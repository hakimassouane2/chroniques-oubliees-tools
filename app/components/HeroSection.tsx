// components/HeroSection.tsx
import FeedIcon from "@mui/icons-material/Feed";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
interface HeroSectionProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string; // The link that the button will navigate to
  hasSecondimage?: boolean;
  secondImageSrc?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc,
  title,
  subtitle,
  buttonText,
  buttonLink,
  hasSecondimage = false,
  secondImageSrc = "",
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "58vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Image src={imageSrc} layout="fill" objectFit="cover" alt="hero image" />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)", // This darkens the image
        }}
      ></Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        {hasSecondimage && (
          <div
            style={{
              borderRadius: "50%",
              width: "110px" /* You can set this to whatever you prefer */,
              height:
                "110px" /* Ensure this matches the width for a perfect circle */,
              overflow: "hidden",
              boxShadow: "0 0.5rem 1rem rgba(0,0,0,.15)",
              border: "3px solid lightgray",
              backgroundColor: "#bfbfbf",
              marginBottom: "1rem",
            }}
          >
            <Image
              src={secondImageSrc}
              alt="hero second image"
              height={110}
              width={110}
            />
          </div>
        )}
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 3, textShadow: "1px 1px 5px #000" }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: "roboto",
              fontWeight: 300,
              mb: 2,
              textShadow: "1px 1px 5px #000",
            }}
            gutterBottom
          >
            {subtitle}
          </Typography>
        )}
        {buttonText && buttonLink && (
          <Link href={buttonLink} passHref>
            <Button
              variant="outlined"
              startIcon={<FeedIcon />}
              sx={{
                color: "#ebdec2",
                border: "1px solid #ebdec2",
                borderRadius: 0,
                fontFamily: "roboto",
                fontWeight: 300,
                textTransform: "none",
                bgcolor: "rgba(0,0,0,.5);",
                ":hover": {
                  bgcolor: "#ebdec2", // theme.palette.primary.main
                  color: "#5c2e05",
                },
              }}
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default HeroSection;
