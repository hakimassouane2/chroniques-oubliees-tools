import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import slugify from "../../../utils/slguify";

interface Ability {
  label: string;
  slug: string;
  description: string;
  isLimited: boolean;
  isSpell: boolean;
}

interface Way {
  label: string;
  abilities: Ability[];
  slug: string;
  type: string;
  additionalDescription?: string;
  linkedProfiles?: string[];
}

interface FormData {
  slug: string;
  label: string;
  description: string;
  hasMagicAttackModifier: boolean;
  magicAttackModifier?: string;
  hd: string;
  weaponsAndArmor: string;
  startingEquipment: string;
  imageUrl: string;
  imageUrlCropped: string;
  ways: Way[];
}

const ProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    slug: "",
    label: "",
    description: "",
    hasMagicAttackModifier: false,
    magicAttackModifier: "",
    hd: "",
    weaponsAndArmor: "",
    startingEquipment: "",
    imageUrl: "",
    imageUrlCropped: "",
    ways: [
      {
        label: "",
        slug: "",
        type: "character",
        linkedProfiles: [],
        abilities: [
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
        ],
      },
      {
        label: "",
        slug: "",
        type: "character",
        linkedProfiles: [],
        abilities: [
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
        ],
      },
      {
        label: "",
        slug: "",
        type: "character",
        linkedProfiles: [],
        abilities: [
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
        ],
      },
      {
        label: "",
        slug: "",
        type: "character",
        linkedProfiles: [],
        abilities: [
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
        ],
      },
      {
        label: "",
        slug: "",
        type: "character",
        linkedProfiles: [],
        abilities: [
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
          {
            label: "",
            description: "",
            slug: "",
            isSpell: false,
            isLimited: false,
          },
        ],
      },
    ],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeCheckbox = (e: any) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      hasMagicAttackModifier: checked,
      magicAttackModifier: "",
    });
  };

  const handleWayChange = (
    wayIndex: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    // Create a copy of the formData
    const updatedFormData = { ...formData };

    // Update the name of the specified way
    updatedFormData.ways[wayIndex].label = value;

    // Update the state with the new formData
    setFormData(updatedFormData);
  };

  const handleAbilityChangeName = (
    wayIndex: number,
    abilityIndex: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    // Create a copy of the formData
    const updatedFormData = { ...formData };

    // Update the name of the specified way
    updatedFormData.ways[wayIndex].abilities[abilityIndex].label = value;

    // Update the state with the new formData
    setFormData(updatedFormData);
  };

  const handleAbilityChangeDescription = (
    wayIndex: number,
    abilityIndex: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    // Create a copy of the formData
    const updatedFormData = { ...formData };

    // Update the name of the specified way
    updatedFormData.ways[wayIndex].abilities[abilityIndex].description = value;

    // Update the state with the new formData
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    formData.slug = slugify(formData.label);
    formData.ways.forEach((way) => {
      way.slug = slugify(way.label);
      way.abilities.forEach((ability) => {
        ability.slug = slugify(ability.label);
      });
    });
    console.log("formData", formData);

    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profil posted successfully");
      } else {
        alert("Error posting profil");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      <Box display="flex" sx={{ width: 1 }} gap={2}>
        <TextField
          name="label"
          label="Nom du profil"
          variant="outlined"
          required
          value={formData.label}
          onChange={handleChange}
          inputProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input text
          InputLabelProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input label
          sx={{ backgroundColor: "white", flex: 1 }}
        />
        <FormControl sx={{ flex: 1 }}>
          <InputLabel
            sx={{
              fontFamily: "Roboto",
              fontWeight: 300,
            }}
          >
            Dé de vie
          </InputLabel>
          <Select
            name="hd"
            value={formData.hd}
            label="Dé de vie"
            onChange={handleChangeSelect}
            sx={{
              fontFamily: "Roboto",
              fontWeight: 300,
              backgroundColor: "white",
            }}
          >
            <MenuItem
              value={"1d4"}
              sx={{
                fontFamily: "Roboto",
                fontWeight: 300,
              }}
            >
              1d4
            </MenuItem>
            <MenuItem
              value={"1d6"}
              sx={{
                fontFamily: "Roboto",
                fontWeight: 300,
              }}
            >
              1d6
            </MenuItem>
            <MenuItem
              value={"1d8"}
              sx={{
                fontFamily: "Roboto",
                fontWeight: 300,
              }}
            >
              1d8
            </MenuItem>
            <MenuItem
              value={"1d10"}
              sx={{
                fontFamily: "Roboto",
                fontWeight: 300,
              }}
            >
              1d10
            </MenuItem>
            <MenuItem
              value={"1d12"}
              sx={{
                fontFamily: "Roboto",
                fontWeight: 300,
              }}
            >
              1d12
            </MenuItem>
            <MenuItem
              value={"1d20"}
              sx={{
                fontFamily: "Roboto",
                fontWeight: 300,
              }}
            >
              1d20
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="slug"
          label="Slug URL"
          variant="outlined"
          disabled
          value={slugify(formData.label)}
          inputProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input text
          InputLabelProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input label
          sx={{ backgroundColor: "white", flex: 1 }}
        />
      </Box>

      <Box display="flex" justifyContent="start" sx={{ width: 1 }} gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              value={formData.hasMagicAttackModifier}
              onChange={handleChangeCheckbox}
            />
          }
          sx={{ color: "black", flex: 1 }}
          label="Possède un modificateur d'attaque magique ?"
        />
        {formData.hasMagicAttackModifier && (
          <>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: 300,
                }}
              >
                Modificateur d&apos;attaque magique
              </InputLabel>
              <Select
                name="magicAttackModifier"
                value={formData.magicAttackModifier}
                label="Modificateur d'attaque magique"
                onChange={handleChangeSelect}
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: 300,
                  backgroundColor: "white",
                }}
              >
                <MenuItem
                  value={"INT"}
                  sx={{
                    fontFamily: "Roboto",
                    fontWeight: 300,
                  }}
                >
                  Intelligence
                </MenuItem>
                <MenuItem
                  value={"WIS"}
                  sx={{
                    fontFamily: "Roboto",
                    fontWeight: 300,
                  }}
                >
                  Sagesse
                </MenuItem>
                <MenuItem
                  value={"CHA"}
                  sx={{
                    fontFamily: "Roboto",
                    fontWeight: 300,
                  }}
                >
                  Charisme
                </MenuItem>
              </Select>
            </FormControl>
            <span style={{ flex: 1 }}></span>
          </>
        )}
      </Box>

      <TextField
        name="description"
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
        inputProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input text
        InputLabelProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input label
        sx={{ backgroundColor: "white" }}
      />
      <Box display="flex" sx={{ width: 1 }} gap={2}>
        <TextField
          name="weaponsAndArmor"
          label="Armes et armures"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formData.weaponsAndArmor}
          onChange={handleChange}
          inputProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input text
          InputLabelProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input label
          sx={{ backgroundColor: "white", flex: 1 }}
        />
        <TextField
          name="startingEquipment"
          label="Équipement de départ"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formData.startingEquipment}
          onChange={handleChange}
          inputProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input text
          InputLabelProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input label
          sx={{ backgroundColor: "white", flex: 1 }}
        />
      </Box>
      <Box display="flex" sx={{ width: 1 }} gap={2}>
        <TextField
          name="imageUrl"
          label="URL de l'image"
          variant="outlined"
          fullWidth
          value={formData.imageUrl}
          onChange={handleChange}
          inputProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input text
          InputLabelProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input label
          sx={{ backgroundColor: "white", flex: 1 }}
        />
        <TextField
          name="imageUrlCropped"
          label="URL de l'image recadrée"
          variant="outlined"
          fullWidth
          value={formData.imageUrlCropped}
          onChange={handleChange}
          inputProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input text
          InputLabelProps={{ style: { fontFamily: "roboto", fontWeight: 300 } }} // font size of input label
          sx={{ backgroundColor: "white", flex: 1 }}
        />
      </Box>

      {/* Ways */}
      {formData.ways.map((way, wayIndex) => (
        <div key={wayIndex}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{`Voie ${wayIndex + 1}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                name={`ways[${wayIndex}].label`}
                label="Nom de la voie"
                variant="outlined"
                fullWidth
                value={way.label}
                onChange={(e) => handleWayChange(wayIndex, e)}
                inputProps={{
                  style: { fontFamily: "roboto", fontWeight: 300 },
                }} // font size of input text
                InputLabelProps={{
                  style: { fontFamily: "roboto", fontWeight: 300 },
                }} // font size of input label
                sx={{ backgroundColor: "white", mb: 2 }}
              />

              {/* Abilities */}
              {way.abilities.map((ability, abilityIndex) => (
                <div key={abilityIndex}>
                  <TextField
                    name={`ways[${wayIndex}].abilities[${abilityIndex}].label`}
                    label={`Nom de la capacité ${abilityIndex + 1}`}
                    variant="outlined"
                    fullWidth
                    value={ability.label}
                    onChange={(e) =>
                      handleAbilityChangeName(wayIndex, abilityIndex, e)
                    }
                    inputProps={{
                      style: { fontFamily: "roboto", fontWeight: 300 },
                    }} // font size of input text
                    InputLabelProps={{
                      style: { fontFamily: "roboto", fontWeight: 300 },
                    }} // font size of input label
                    sx={{ backgroundColor: "white", my: 2 }}
                  />
                  <TextField
                    name={`ways[${wayIndex}].abilities[${abilityIndex}].description`}
                    label={`Description de la capacité ${abilityIndex + 1}`}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={ability.description}
                    onChange={(e) =>
                      handleAbilityChangeDescription(wayIndex, abilityIndex, e)
                    }
                    inputProps={{
                      style: { fontFamily: "roboto", fontWeight: 300 },
                    }} // font size of input text
                    InputLabelProps={{
                      style: { fontFamily: "roboto", fontWeight: 300 },
                    }} // font size of input label
                    sx={{ backgroundColor: "white", my: 2 }}
                  />
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
      ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          color: "white",
          fontFamily: "Roboto",
          fontWeight: 300,
          textTransform: "none",
        }}
      >
        Enregistrer
      </Button>
    </form>
  );
};

export default ProfileForm;
