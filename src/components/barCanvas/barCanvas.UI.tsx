import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../common/buttons";
import RadioButton from "../common/radioButton";
import DelaySlider from "../common/delaySlider";
import InputBox from "../common/InputBox";

const StyleCanvasUI = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1%;
    position: relative;
    row-gap: 20px;
    padding-bottom: 10px;
    padding-top: 2%;
    padding-bottom: 2%;
`;

const RadioContainer = styled.div`
    display: flex;
`;

interface CanvasUIProps {
    handleAdd: (inputValue: string) => void;
    handleReset: () => void;
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    handleStart: () => void;
    handleRandom: () => void;
    handleDelay: (delay: number) => void;
}

const BarCanvasUI: React.FC<CanvasUIProps> = ({ handleAdd, handleReset, setSortOrder, handleStart, handleRandom, handleDelay }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [dataLength, setDataLength] = useState<number>(0);
    const [isAscending, setIsAscending] = useState<boolean>(false);

    const [isValidBtnAdd, setIsValidBtnAdd] = useState<boolean>(false);
    const [isValidBtnReset, setIsValidBtnReset] = useState<boolean>(false);
    const [isValidBtnRandom, setIsValidBtnRandom] = useState<boolean>(true);
    const [isValidBtnStart, setIsValidBtnStart] = useState<boolean>(false);

    useEffect(() => {
        setIsValidBtnReset(dataLength > 0);
    }, [dataLength]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setIsValidBtnAdd(/^\d+$/.test(value));
    };

    const onclickBtnAdd = () => {
        if (isValidBtnAdd === false) return;
        if (dataLength !== 0 && isValidBtnStart === false) return;
        
        handleAdd(inputValue);
        setInputValue('');

        setIsValidBtnAdd(false);
        setIsValidBtnStart(true);

        setDataLength(prev => prev + 1);
    };

    const onclickBtnReset = () => {
        handleReset();
        setDataLength(0);

        setIsValidBtnReset(false);
        setIsValidBtnStart(false);
    };

    const onclickBtnStart = async () => {
        setIsValidBtnAdd(false);

        setIsValidBtnReset(false);
        setIsValidBtnRandom(false);
        setIsValidBtnStart(false);

        await handleStart();

        setIsValidBtnReset(true);
        setIsValidBtnRandom(true);
        setIsValidBtnStart(true);
    };

    const onclickBtnRandom = async () => {
        handleRandom();
        setDataLength(20);

        setIsValidBtnReset(true);
        setIsValidBtnStart(true);
    };
    
    const handleSetSort = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sortOrder = event.target.value as "asc" | "desc";
        setSortOrder(sortOrder);
        setIsAscending(sortOrder === "asc");
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && isValidBtnAdd) {
            onclickBtnAdd();
        }
    };

    const handleDelayChange = (value: number) => {
        handleDelay(value);
    };

    return (
        <StyleCanvasUI>
            <InputBox
                placeholder='추가할 데이터를 입력하세요.'
                inputValue={inputValue}
                handleInputChange={handleInputChange}
                onclickBtnAdd={onclickBtnAdd}
                handleKeyPress={handleKeyPress}
                isValidBtnAdd={isValidBtnAdd}
            />
            <Button onClick={onclickBtnReset} disabled={!isValidBtnReset}>Reset</Button>
            <Button onClick={onclickBtnRandom} disabled={!isValidBtnRandom}>Random</Button>
            <Button onClick={onclickBtnStart} disabled={!isValidBtnStart}>Start</Button>
            <RadioContainer>
                <RadioButton value="asc" checked={isAscending} onChange={handleSetSort} label="오름차순" />
                <RadioButton value="desc" checked={!isAscending} onChange={handleSetSort} label="내림차순" />
            </RadioContainer>
            <DelaySlider onDelayChange={handleDelayChange}/>            
        </ StyleCanvasUI>
    );
};

export default BarCanvasUI;
