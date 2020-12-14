import React from "react";
import classes from "./../Dialogs.module.css";
import {MessageType} from "../../../types/commonTypes";

type PropsType = MessageType
export const Message: React.FC<PropsType> = (props) =>
  <div key={props.id}
       className={classes.message}>{props.message}
  </div>;
