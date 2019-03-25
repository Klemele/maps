import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import Landscape from "@material-ui/icons/Landscape";
import React from "react";
import { Card } from "../../";
import individual from "../../../../assests/individual.svg";
import { UserContext } from "../../../../context/UserContext";
import { IIndividual, userCategory, userLevel } from "../../../../types";

interface ICardIndividualOwnProps {
  individual: IIndividual;
}

const CardIndividual: React.FunctionComponent<
  ICardIndividualOwnProps
> = props => {
  const {
    uuid,
    primary,
    location,
    interests,
    level,
    hasSpace,
    spaces
  } = props.individual;
  const user = {
    category: userCategory.individual,
    interests,
    location,
    primary,
    uuid
  };
  const { setFocus } = React.useContext(UserContext);

  const renderContent = (className: string) => (
    <div className={className}>
      <Typography variant="subtitle1">
        Experience: {userLevel[level.toString()]}
      </Typography>
    </div>
  );
  const renderActions = (className: string) => (
    // TODO: Action to define
    <>
      <Button className={className} onClick={focusMapOnLocation(location)}>
        <GpsFixed />
      </Button>
      {hasSpace && (
        <Button className={className} onClick={focusMapOnLocation(spaces[0])}>
          <Landscape />
        </Button>
      )}
      <Button className={className}>
        <Email />
      </Button>
    </>
  );

  const focusMapOnLocation: (
    locationToFocus: number[]
  ) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void = locationToFocus => event => {
    setFocus(locationToFocus);
  };

  return (
    <Card avatar={individual} user={user} actions={renderActions}>
      {className => renderContent(className)}
    </Card>
  );
};

export default CardIndividual;
