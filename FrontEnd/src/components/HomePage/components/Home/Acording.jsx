import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
const Accordions = (props) => {
  const { DataAcording } = props;
  return (
    <Accordion allowZeroExpanded>
      {DataAcording.map((item) => (
        <AccordionItem key={item.uuid}>
          <AccordionItemHeading>
            <AccordionItemButton>{item.title}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{item.content}</AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Accordions;
