import React from "react";
import { useEffect } from "react";
import { fetchData } from "../../fetchModule";
import ActivityPDF from "./ActivityPDF";

export const GenerateActivityPDF = () => {
  return (
    <div className="h-full">
      <ActivityPDF></ActivityPDF>
    </div>
  );
};
