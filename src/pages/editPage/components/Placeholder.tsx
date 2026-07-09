import React from "react";
// import { NodeModel } from "@minoru/react-dnd-treeview";
import { NodeModel } from "../../../types/TreeTypes";
import styles from "./styles/Placeholder.module.css";

type Props = {
  node: NodeModel;
  depth: number;
};

export const Placeholder: React.FC<Props> = (props) => {
  const left = props.depth * 24;
  return <div className={styles.root} style={{ left }}></div>;
};
