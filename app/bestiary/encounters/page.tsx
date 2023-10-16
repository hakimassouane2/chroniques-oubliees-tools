"use client";
import HeroSection from "@/components/HeroSection";
import MonsterEncounterBlock from "@/components/encounter/MonsterEncounterBlock";
import { useLoading } from "@/contexts/LoadingContext";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import * as React from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  fontFamily: "Roboto",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const monsters = [
  {
    _id: "651c79ffead01fa697d7701b",
    name: [
      {
        value: "loup",
        label: "Loup",
      },
    ],
    appearance: [
      {
        value: null,
        format: null,
      },
    ],
    description: [
      {
        value:
          "<p>Seul, le loup n’a pas usage de la Voie de la meute et son NC passe à ½. Ce Profil correspond à un loup d’une cinquantaine de kilos.</p>\r\n",
        format: "simple_html",
      },
    ],
    creature_family: [
      {
        target_id: "30",
        label: "Loups",
      },
    ],
    environment: [
      {
        value: "forest",
        label: "Forêt",
      },
    ],
    archetype: [
      {
        value: "standard",
        label: "Standard",
      },
    ],
    boss_type: [],
    boss_rank: [],
    level: [
      {
        value: "1",
      },
    ],
    category: [
      {
        value: "alive",
        label: "Vivante",
      },
    ],
    size: [
      {
        value: "medium",
        label: "Moyen",
      },
    ],
    str_mod: [
      {
        value: "1",
      },
    ],
    str_comment: [],
    dex_mod: [
      {
        value: "1",
      },
    ],
    dex_comment: [],
    con_mod: [
      {
        value: "1",
      },
    ],
    con_comment: [],
    int_mod: [
      {
        value: "-4",
      },
    ],
    int_comment: [],
    wis_mod: [
      {
        value: "2",
      },
    ],
    wis_comment: [],
    cha_mod: [
      {
        value: "-2",
      },
    ],
    cha_comment: [],
    sup_abilities: [
      {
        value: "con",
        label: "CON",
      },
      {
        value: "wis",
        label: "SAG",
      },
    ],
    defense: [
      {
        value: "14",
      },
    ],
    health_point: [
      {
        value: "9",
      },
    ],
    dmg_reduction: [],
    init: [
      {
        value: "12",
      },
    ],
    attacks: [
      {
        value:
          "<p><strong>Morsure</strong> +2 <strong>DM</strong> 1d6+1</p>\r\n",
        format: "simple_html",
        data: [
          {
            name: "Morsure",
            test: "+2",
            dm: "1d6+1",
            special: null,
            reach: null,
          },
        ],
      },
    ],
    profile: [],
    profile_level: [],
    paths: [
      {
        value: "<p><strong>Voie de la meute</strong> rang 1</p>\r\n",
        format: "simple_html",
      },
    ],
    special_capabilities: [
      {
        value: null,
        format: null,
      },
    ],
    comments: [
      {
        value:
          "<p><em>Chien :</em> vous pouvez aussi utiliser le Profil du loup pour les gros chiens en retirant de 2 à 4 PV</p>\r\n",
        format: "simple_html",
      },
    ],
    structured_capabilities: {
      "84": {
        id: "84",
        name: "Voie de la meute",
        type: "creature",
        capabilities: {
          "1": {
            target_id: "393",
            label: "Interchangeables",
            rank: "1",
            is_limited: "0",
            is_magical: "0",
            description:
              "Tant que la créature et ses alliées sont plus nombreuses que la cible, elles se relaient pour esquiver ses attaques et elles obtiennent un bonus de +5 en DEF. Si plusieurs créatures semblables sont au contact du PJ, le MJ a toute latitude pour infliger les DM d’une attaque sur la créature de son choix, le personnage ne sait jamais laquelle il blesse.\r\n",
          },
        },
        rank: 1,
      },
    },
    capabilities: [
      {
        target_id: "393",
        label: "Interchangeables",
        rank: "1",
        is_limited: "0",
        is_magical: "0",
        description:
          "Tant que la créature et ses alliées sont plus nombreuses que la cible, elles se relaient pour esquiver ses attaques et elles obtiennent un bonus de +5 en DEF. Si plusieurs créatures semblables sont au contact du PJ, le MJ a toute latitude pour infliger les DM d’une attaque sur la créature de son choix, le personnage ne sait jamais laquelle il blesse.\r\n",
        paths: "Voie de la meute",
      },
    ],
    picture: [
      {
        target_id: "1053",
        alt: "",
        title: "",
        width: "1024",
        height: "1024",
        label: "wolf-modified.png",
        creature_token_url: "/creatures/images/loup.png",
      },
    ],
  },
  {
    name: [
      {
        value: "grand-male-lion",
        label: "Grand mâle, lion",
      },
    ],
    appearance: [
      {
        value: null,
        format: null,
      },
    ],
    description: [
      {
        value: "<p>Un lion mâle peut peser jusqu’à 300 kg.</p>\r\n",
        format: "simple_html",
      },
    ],
    creature_family: [
      {
        target_id: "28",
        label: "Lions",
      },
    ],
    environment: [
      {
        value: "plain",
        label: "Plaine",
      },
    ],
    archetype: [
      {
        value: "standard",
        label: "Standard",
      },
    ],
    boss_type: [
      {
        value: "powerful",
        label: "Puissant",
      },
    ],
    boss_rank: [
      {
        value: "1",
      },
    ],
    level: [
      {
        value: "5",
      },
    ],
    category: [
      {
        value: "alive",
        label: "Vivante",
      },
    ],
    size: [
      {
        value: "big",
        label: "Grande",
      },
    ],
    str_mod: [
      {
        value: "6",
      },
    ],
    str_comment: [],
    dex_mod: [
      {
        value: "4",
      },
    ],
    dex_comment: [],
    con_mod: [
      {
        value: "5",
      },
    ],
    con_comment: [],
    int_mod: [
      {
        value: "-4",
      },
    ],
    int_comment: [],
    wis_mod: [
      {
        value: "2",
      },
    ],
    wis_comment: [],
    cha_mod: [
      {
        value: "2",
      },
    ],
    cha_comment: [],
    sup_abilities: [
      {
        value: "dex",
        label: "DEX",
      },
      {
        value: "wis",
        label: "SAG",
      },
    ],
    defense: [
      {
        value: "20",
      },
    ],
    health_point: [
      {
        value: "50",
      },
    ],
    dmg_reduction: [],
    init: [
      {
        value: "18",
      },
    ],
    attacks: [
      {
        value:
          "<p><strong>Morsures et griffes</strong> +9 <strong>DM</strong> 2d6+7</p>\r\n",
        format: "simple_html",
        data: [
          {
            name: "Morsures et griffes",
            test: "+9",
            dm: "2d6+7",
            special: null,
            reach: null,
          },
        ],
      },
    ],
    profile: [],
    profile_level: [],
    paths: [
      {
        value: "<p><strong>Voie du prédateur</strong> rang 2</p>\r\n",
        format: "simple_html",
      },
    ],
    special_capabilities: [
      {
        value: null,
        format: null,
      },
    ],
    comments: [
      {
        value: null,
        format: null,
      },
    ],
    structured_capabilities: {
      "82": {
        id: "82",
        name: "Voie du prédateur",
        type: "creature",
        capabilities: {
          "1": {
            target_id: "387",
            label: "Embuscade",
            rank: "1",
            is_limited: "0",
            is_magical: "0",
            description:
              "Au premier tour de combat, si l’environnement permet à la créature de se dissimuler, la cible doit faire un test de SAG difficulté [15 + Mod. de DEX] ou être Surprise. Si elle attaque avec succès une cible surprise, la créature inflige +1d6 aux DM et toute créature dont la FOR est inférieure à la sienne est Renversée. La créature obtient un bonus de +5 à tous les tests de discrétion et en Init.\r\n",
          },
          "2": {
            target_id: "388",
            label: "Dévorer",
            rank: "2",
            is_limited: "0",
            is_magical: "0",
            description:
              "Lorsque la créature réussit une attaque avec un résultat de 15-20 au d20, elle saisit sa proie entre ses crocs ou ses griffes et lui inflige immédiatement une attaque gratuite supplémentaire. Si la FOR de la cible est inférieure ou égale au prédateur, elle est de plus Renversée et Immobilisée. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour se relever si elle a réussi).\r\n",
          },
        },
        rank: 2,
      },
    },
    capabilities: [
      {
        target_id: "387",
        label: "Embuscade",
        rank: "1",
        is_limited: "0",
        is_magical: "0",
        description:
          "Au premier tour de combat, si l’environnement permet à la créature de se dissimuler, la cible doit faire un test de SAG difficulté [15 + Mod. de DEX] ou être Surprise. Si elle attaque avec succès une cible surprise, la créature inflige +1d6 aux DM et toute créature dont la FOR est inférieure à la sienne est Renversée. La créature obtient un bonus de +5 à tous les tests de discrétion et en Init.\r\n",
        paths: "Voie du prédateur",
      },
      {
        target_id: "388",
        label: "Dévorer",
        rank: "2",
        is_limited: "0",
        is_magical: "0",
        description:
          "Lorsque la créature réussit une attaque avec un résultat de 15-20 au d20, elle saisit sa proie entre ses crocs ou ses griffes et lui inflige immédiatement une attaque gratuite supplémentaire. Si la FOR de la cible est inférieure ou égale au prédateur, elle est de plus Renversée et Immobilisée. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour se relever si elle a réussi).\r\n",
        paths: "Voie du prédateur",
      },
    ],
    picture: [
      {
        target_id: "1051",
        alt: "Grand mâle, lion",
        title: "",
        width: "1024",
        height: "1024",
        label: "lion_great_male-modified.png",
        creature_token_url: "/creatures/images/grand-male-lion.png",
      },
    ],
  },
  {
    name: [
      {
        value: "fantome-majeur",
        label: "Fantôme majeur",
      },
    ],
    appearance: [
      {
        value: null,
        format: null,
      },
    ],
    description: [
      {
        value: null,
        format: null,
      },
    ],
    creature_family: [
      {
        target_id: "16",
        label: "Fantômes",
      },
    ],
    environment: [
      {
        value: "special",
        label: "Spécial",
      },
    ],
    archetype: [
      {
        value: "standard",
        label: "Standard",
      },
    ],
    boss_type: [
      {
        value: "berserk",
        label: "Berserk",
      },
    ],
    boss_rank: [
      {
        value: "2",
      },
    ],
    level: [
      {
        value: "5",
      },
    ],
    category: [
      {
        value: "non_living",
        label: "Non-vivante",
      },
    ],
    size: [
      {
        value: "medium",
        label: "Moyen",
      },
    ],
    str_mod: [
      {
        value: "1",
      },
    ],
    str_comment: [],
    dex_mod: [
      {
        value: "1",
      },
    ],
    dex_comment: [],
    con_mod: [
      {
        value: "1",
      },
    ],
    con_comment: [],
    int_mod: [
      {
        value: "0",
      },
    ],
    int_comment: [],
    wis_mod: [
      {
        value: "2",
      },
    ],
    wis_comment: [],
    cha_mod: [
      {
        value: "-2",
      },
    ],
    cha_comment: [],
    sup_abilities: [],
    defense: [
      {
        value: "14",
      },
    ],
    health_point: [
      {
        value: "39",
      },
    ],
    dmg_reduction: [
      {
        value: "10 / Magie",
      },
    ],
    init: [
      {
        value: "12",
      },
    ],
    attacks: [
      {
        value:
          "<p><strong>Contact corrupteur</strong> +10 <strong>DM</strong> 3d6+1</p>\r\n",
        format: "simple_html",
        data: [
          {
            name: "Contact corrupteur",
            test: "+10",
            dm: "3d6+1",
            special: null,
            reach: null,
          },
        ],
      },
    ],
    profile: [],
    profile_level: [],
    paths: [
      {
        value:
          "<p><strong>Voie des créatures magiques</strong> rang 2 (RD 10/Magie)</p>\r\n",
        format: "simple_html",
      },
    ],
    special_capabilities: [
      {
        value:
          "<p><em>Vol</em> : le fantôme peut se déplacer en vol de 20 m par action de mouvement.</p>\r\n\r\n<p><em>Affaiblissement</em> : à chaque fois qu’une créature subit les DM du contact corrupteur du fantôme, elle doit réussir un test de CON difficulté 12 ou être <em>Affaiblie</em> pendant 1d6 minutes.</p>\r\n\r\n<p><em>Intangible</em> : un fantôme peut passer à travers les murs et les objets comme s’ils n’existaient pas. Il ne peut pas traverser les objets magiques ou organiques ni les créatures.</p>\r\n\r\n<p><em>Télékinésie (L)</em> : le fantôme peut déplacer les objets par sa force psychique. Il peut soulever une masse allant jusqu’à environ 200 kg ou plusieurs petits objets. S’il projette ces objets sur une cible en réussissant un test d’attaque (+10), il inflige jusqu’à 3d6+1 DM à une distance maximum de 20 mètres.</p>\r\n\r\n<p><em>Aspect terrifiant</em> : le fantôme peut prendre instantanément un aspect terrifiant. Toutes les créatures témoins de cette transformation pour la première fois doivent réussir un test de SAG difficulté 15 ou être <em>Affaiblie</em> au prochain tour.</p>\r\n\r\n<p><em>Hurlement (L)</em> : le fantôme pousse un terrible hurlement, toutes les créatures présentent dans un rayon de 10 mètres doivent réussir un test de SAG difficulté 12 ou fuir pendant 1d6 tours. Une créature qui a réussi son test de SAG est immunisée au Hurlement pour les prochaines 24 heures.</p>\r\n\r\n<p><em>Possession (L)</em> : le fantôme tente de fusionner avec une créature au contact. La victime doit réussir un test de SAG difficulté 12 pour résister à ce pouvoir, en cas de succès, elle est immunisée au pouvoir de possession pour 24 heures. En cas d’échec, le fantôme prend le contrôle du corps de son hôte pendant 1d6 minutes. Il est dit que certains fantômes très puissants peuvent prolonger la possession beaucoup plus longtemps…</p>\r\n",
        format: "simple_html",
      },
    ],
    comments: [
      {
        value: null,
        format: null,
      },
    ],
    structured_capabilities: {
      "89": {
        id: "89",
        name: "Voie des créatures magiques",
        type: "creature",
        capabilities: {
          "1": {
            target_id: "408",
            label: "Réduction des DM",
            rank: "1",
            is_limited: "0",
            is_magical: "0",
            description:
              "La créature est peu sensible aux DM provoqués par les armes, le métal rebondi sur elle comme un vulgaire morceau de bois ou alors la créature guérit immédiatement. Elle obtient une réduction des DM (RD) de 5, ce score est retranché à tous les DM subits. Choisissez un type d’arme qui ignore cette réduction : un certain métal ou un certain type d’armes ou encore la magie (armes et sorts). Par exemple les masses sur un squelette ou les armes en argent sur un lycanthrope. Vous pouvez augmenter cette réduction des DM à 10 au rang 2 et à 15 au rang 3.\r\n",
          },
          "2": {
            target_id: "409",
            label: "Vitalité surnaturelle",
            rank: "2",
            is_limited: "0",
            is_magical: "0",
            description:
              "La créature guérit à un rythme fantastique, elle récupère 5 PV à la fin de chaque tour. Il existe parfois une source de DM qui permet d’empêcher cette régénération (le feu pour les trolls par exemple). Alternativement remplacez simplement la régénération par une vitalité extraordinaire (c’est souvent le cas des mort-vivants ou des créatures artificielles) : doublez ses PV ou ajoutez +20 PV (si ces PV de base sont inférieurs à 20).\r\n",
          },
        },
        rank: 2,
      },
    },
    capabilities: [
      {
        target_id: "408",
        label: "Réduction des DM",
        rank: "1",
        is_limited: "0",
        is_magical: "0",
        description:
          "La créature est peu sensible aux DM provoqués par les armes, le métal rebondi sur elle comme un vulgaire morceau de bois ou alors la créature guérit immédiatement. Elle obtient une réduction des DM (RD) de 5, ce score est retranché à tous les DM subits. Choisissez un type d’arme qui ignore cette réduction : un certain métal ou un certain type d’armes ou encore la magie (armes et sorts). Par exemple les masses sur un squelette ou les armes en argent sur un lycanthrope. Vous pouvez augmenter cette réduction des DM à 10 au rang 2 et à 15 au rang 3.\r\n",
        paths: "Voie des créatures magiques",
      },
      {
        target_id: "409",
        label: "Vitalité surnaturelle",
        rank: "2",
        is_limited: "0",
        is_magical: "0",
        description:
          "La créature guérit à un rythme fantastique, elle récupère 5 PV à la fin de chaque tour. Il existe parfois une source de DM qui permet d’empêcher cette régénération (le feu pour les trolls par exemple). Alternativement remplacez simplement la régénération par une vitalité extraordinaire (c’est souvent le cas des mort-vivants ou des créatures artificielles) : doublez ses PV ou ajoutez +20 PV (si ces PV de base sont inférieurs à 20).\r\n",
        paths: "Voie des créatures magiques",
      },
    ],
    picture: [
      {
        target_id: "1007",
        alt: "Fantôme majeur",
        title: "",
        width: "1024",
        height: "1024",
        label: "ghost_major-modified.png",
        creature_token_url: "/creatures/images/fantome-majeur.png",
      },
    ],
  },
  {
    name: [
      {
        value: "elementaire-terre-moyen",
        label: "Elémentaire de terre, moyen",
      },
    ],
    appearance: [
      {
        value: null,
        format: null,
      },
    ],
    description: [
      {
        value: null,
        format: null,
      },
    ],
    creature_family: [
      {
        target_id: "12",
        label: "Elémentaires",
      },
    ],
    environment: [
      {
        value: "special",
        label: "Spécial",
      },
    ],
    archetype: [
      {
        value: "standard",
        label: "Standard",
      },
    ],
    boss_type: [
      {
        value: "standard",
        label: "Standard",
      },
    ],
    boss_rank: [
      {
        value: "1",
      },
    ],
    level: [
      {
        value: "2",
      },
    ],
    category: [
      {
        value: "non_living",
        label: "Non-vivante",
      },
    ],
    size: [
      {
        value: "medium",
        label: "Moyen",
      },
    ],
    str_mod: [
      {
        value: "1",
      },
    ],
    str_comment: [],
    dex_mod: [
      {
        value: "1",
      },
    ],
    dex_comment: [],
    con_mod: [
      {
        value: "1",
      },
    ],
    con_comment: [],
    int_mod: [
      {
        value: "-4",
      },
    ],
    int_comment: [],
    wis_mod: [
      {
        value: "0",
      },
    ],
    wis_comment: [],
    cha_mod: [
      {
        value: "-2",
      },
    ],
    cha_comment: [],
    sup_abilities: [
      {
        value: "con",
        label: "CON",
      },
    ],
    defense: [
      {
        value: "19",
      },
    ],
    health_point: [
      {
        value: "29",
      },
    ],
    dmg_reduction: [
      {
        value: "5 / magie",
      },
    ],
    init: [
      {
        value: "12",
      },
    ],
    attacks: [
      {
        value: "<p><strong>Coup</strong> +4 <strong>DM</strong> 1d6+3</p>\r\n",
        format: "simple_html",
        data: [
          {
            name: "Coup",
            test: "+4",
            dm: "1d6+3",
            special: null,
            reach: null,
          },
        ],
      },
    ],
    profile: [],
    profile_level: [],
    paths: [
      {
        value:
          "<p><strong>Voie des créatures magiques</strong> rang 1 (RD 5 / magie)</p>\r\n",
        format: "simple_html",
      },
    ],
    special_capabilities: [
      {
        value:
          "<p><em>Immunité :</em> les élémentaires de terre sont immunisés aux DM de froid.</p>\r\n\r\n<p><em>Mode d’attaque :</em> l’élémentaire de terre frappe l’adversaire.</p>\r\n\r\n<p><em>Avantages</em> (pris en compte dans le profil) : l’élémentaire de terre obtient un bonus de +3 en DEF.</p>\r\n",
        format: "simple_html",
      },
    ],
    comments: [
      {
        value: null,
        format: null,
      },
    ],
    structured_capabilities: {
      "89": {
        id: "89",
        name: "Voie des créatures magiques",
        type: "creature",
        capabilities: {
          "1": {
            target_id: "408",
            label: "Réduction des DM",
            rank: "1",
            is_limited: "0",
            is_magical: "0",
            description:
              "La créature est peu sensible aux DM provoqués par les armes, le métal rebondi sur elle comme un vulgaire morceau de bois ou alors la créature guérit immédiatement. Elle obtient une réduction des DM (RD) de 5, ce score est retranché à tous les DM subits. Choisissez un type d’arme qui ignore cette réduction : un certain métal ou un certain type d’armes ou encore la magie (armes et sorts). Par exemple les masses sur un squelette ou les armes en argent sur un lycanthrope. Vous pouvez augmenter cette réduction des DM à 10 au rang 2 et à 15 au rang 3.\r\n",
          },
        },
        rank: 1,
      },
    },
    capabilities: [
      {
        target_id: "408",
        label: "Réduction des DM",
        rank: "1",
        is_limited: "0",
        is_magical: "0",
        description:
          "La créature est peu sensible aux DM provoqués par les armes, le métal rebondi sur elle comme un vulgaire morceau de bois ou alors la créature guérit immédiatement. Elle obtient une réduction des DM (RD) de 5, ce score est retranché à tous les DM subits. Choisissez un type d’arme qui ignore cette réduction : un certain métal ou un certain type d’armes ou encore la magie (armes et sorts). Par exemple les masses sur un squelette ou les armes en argent sur un lycanthrope. Vous pouvez augmenter cette réduction des DM à 10 au rang 2 et à 15 au rang 3.\r\n",
        paths: "Voie des créatures magiques",
      },
    ],
    picture: [
      {
        target_id: "979",
        alt: "Elémentaire de terre, moyen",
        title: "",
        width: "1024",
        height: "1024",
        label: "elemental_earth_medium-modified.png",
        creature_token_url: "/creatures/images/elementaire-terre-moyen.png",
      },
    ],
  },
];

const Encounters = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [encounterMonsters, setEncounterMonsters] = React.useState([]);
  const [creatures, setCreatures] = React.useState([]);
  const [selectedCreature, setSelectedCreature] = React.useState(null);
  const [creatureCounters, setCreatureCounters] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("/api/creatures");
      const data = await response.json();
      setCreatures(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleAddCreature = () => {
    if (selectedCreature) {
      const numCreatures = quantity;

      const existingCreatureNames = new Set(
        // @ts-ignore
        encounterMonsters.map((monster) => monster.name[0].label)
      );

      // @ts-ignore
      const baseName = selectedCreature.name[0].label;
      // @ts-ignore
      const existingCount = creatureCounters[baseName] || 0;

      const newMonsters = Array.from({ length: numCreatures }, (_, index) => {
        const newName =
          existingCount > 0
            ? `${baseName} ${existingCount + index + 1}`
            : `${baseName} ${index + 1}`;

        let counter = 1;
        let suffix = "";
        while (existingCreatureNames.has(newName + suffix)) {
          counter++;
          suffix = ` ${counter}`;
        }

        const finalName = counter > 1 ? `${newName} ${counter}` : newName;

        setCreatureCounters((prevCounters) => ({
          ...prevCounters,
          [baseName]: existingCount + numCreatures,
        }));

        return {
          // @ts-ignore
          ...selectedCreature,
          name: [{ value: finalName, label: finalName }],
        };
      });

      // @ts-ignore
      setEncounterMonsters([...encounterMonsters, ...newMonsters]);
    }
  };

  return (
    <>
      <HeroSection
        imageSrc="/heroes/encounter.webp"
        title="Générateur de rencontres"
      />
      <Container maxWidth="xl">
        <Card sx={{ borderRadius: 0, position: "relative", mt: -10, mb: 10 }}>
          <CardContent>
            <Accordion
              defaultExpanded={false}
              onChange={handleChange("panel1")}
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  Gérer les créatures
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display={"flex"} flexDirection={"row"} gap={2}>
                  <Autocomplete
                    options={creatures}
                    // @ts-ignore
                    getOptionLabel={(option) => option?.name[0]?.label}
                    sx={{ width: 300, fontFamily: "roboto", fontWeight: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Créature" />
                    )}
                    onChange={(event, value) => setSelectedCreature(value)} // Update selectedCreature state
                  />
                  <TextField
                    type="number"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      min: 1,
                    }}
                    value={quantity} // Bind the value of the input field to the state
                    onChange={(e) => setQuantity(parseInt(e.target.value))} // Update the state when the input changes
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddCreature}
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: 300,
                      color: "white",
                    }}
                  >
                    Ajouter
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {encounterMonsters.map((monster: any, index: any) => (
                <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
                  <MonsterEncounterBlock
                    monster={monster}
                  ></MonsterEncounterBlock>
                </Grid>
              ))}
            </Grid>
            <Divider />
            <Button
              variant="contained"
              color="error"
              sx={{
                mt: 2,
                fontFamily: "Roboto",
                fontWeight: 300,
                textTransform: "capitalize",
              }}
              onClick={() => {
                setEncounterMonsters([]);
                setCreatureCounters({});
              }}
            >
              Tout supprimer
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Encounters;
