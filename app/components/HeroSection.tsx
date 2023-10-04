// components/HeroSection.tsx
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string; // The link that the button will navigate to
}

const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc,
  title,
  subtitle,
  buttonText,
  buttonLink,
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
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{ fontFamily: "roboto", fontWeight: 300 }}
            gutterBottom
          >
            {subtitle}
          </Typography>
        )}
        {buttonText && buttonLink && (
          <Link href={buttonLink} passHref>
            <Button variant="contained" color="primary">
              {buttonText}
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default HeroSection;
