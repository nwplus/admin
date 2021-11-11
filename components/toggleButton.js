import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { COLOR } from '../constants';
import Eye from '../assets/eye.svg';

const Container = styled.div`
    display: flex;
    cursor: pointer;
    padding: 10px;
`;

const ButtonContainer = css`
    width: 125px;
`;

const ButtonContainerLeft = styled.div`
    ${ButtonContainer}
    border-radius: 100px 0px 0px 100px;
`;

const ButtonContainerRight = styled.div`
    ${ButtonContainer}
    border-radius: 0px 100px 100px 0px;
`;

const Button = css`
    display: flex;
    border-radius: inherit;
    height: 35px;
    justify-content: center;
    align-items: center;
`;

const UnselectedButton = styled.div`
    ${Button}
    background-color: ${COLOR.LIGHT_GRAY};
    color: ${COLOR.UNSELECTED_GRAY};

`;

const SelectedButton = styled.div`
    ${Button}
    background-color: ${COLOR.LIGHT_PURPLE};
    color: ${COLOR.MIDNIGHT_PURPLE};
`;

const EyeImage = styled.img`
    padding-right: 3px;
`;

export default ({ leftText, rightText, isLeftSelected, setIsLeftSelected }) => {

    return (
        <Container>
            <ButtonContainerLeft onClick={() => setIsLeftSelected(true)}>
                {
                    isLeftSelected ? (
                        <SelectedButton>
                            <EyeImage src={Eye} />
                            {leftText}
                        </SelectedButton>
                    ) : (
                        <UnselectedButton>
                            {leftText}
                        </UnselectedButton>
                    )
                }
            </ButtonContainerLeft>
            <ButtonContainerRight onClick={() => setIsLeftSelected(false)}>
                {
                    isLeftSelected ? (
                        <UnselectedButton>
                            {rightText}
                        </UnselectedButton>
                    ) : (
                        <SelectedButton>
                            <EyeImage src={Eye} />
                            {rightText}
                        </SelectedButton>

                    )
                }
            </ButtonContainerRight>
        </Container>
    );
}