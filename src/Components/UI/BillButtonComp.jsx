import React, { useState } from 'react';
import Buttoncmp from './Buttoncmp';

function BillButtonComp(props) {
    let buttonList = props.buttonList ? props.buttonList : [];
    const handleClick = (label) => {
        console.log('Clicked', label);
    };
    console.log(buttonList);
    return (
        <div class="flex flex-col items-center">
            {buttonList && buttonList.map((item) => (
                <Buttoncmp type="submit" label={item && item.semesters_they_in} variant="stpr" size="min" onHandleClick>
                </Buttoncmp>
            ))}
        </div>

    );
}

export default BillButtonComp;
